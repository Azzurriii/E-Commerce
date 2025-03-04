import User from '@models/user.model';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import KeyTokenServices from '@services/key-token.service';
import UserConstants, { ISignUp } from '@interfaces/user';
import AuthUtils from '@utils/auth.utils';
import { getInfoData } from '@utils/index';
import { BadRequestError, AuthFailureError, NotFoundError, FobbidenError } from '@handlers/response-handler';
import UserServices from '@services/user.service';
import { Types } from 'mongoose';
import { getCache, deleteCache, setCache } from '@services/redis.service';
import { generateRandomToken } from '@utils/token.utils';
import { emailQueue } from '@queues/email.queue';
import { EmailTemplate } from '@constants/mail';

// 1. Check if user already exists
// 2. Create a new user
// 3. Create a new key token
// 4. Create a new balance
const signUp = async ({ name, email, password, role }: ISignUp) => {
	const existUser = await User.findOne({ email }).lean();
	if (existUser) {
		throw new BadRequestError('Error: User already registered');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const roles =
		role === UserConstants.RoleUser.COMPANY
			? [UserConstants.RoleUser.COMPANY, UserConstants.RoleUser.USER]
			: [UserConstants.RoleUser.USER];

	let newUser = await User.create({
		name,
		email,
		password: passwordHash,
		roles: roles,
		status: UserConstants.UserStatus.INACTIVE,
		verified: false,
	});
	if (newUser) {
		try {
			const privateKey = crypto.randomBytes(64).toString('hex');
			const publicKey = crypto.randomBytes(64).toString('hex');
			const tokens = await AuthUtils.createTokenPair({ userId: newUser._id, email }, publicKey, privateKey);
			const keyStore = await KeyTokenServices.createKeyToken(
				newUser._id,
				publicKey,
				privateKey,
				tokens.refreshToken,
			);

			if (!keyStore) {
				throw new BadRequestError('Error: keyStore error');
			}

			const verificationToken = generateRandomToken();
			await setCache(`email_verify_${email}`, verificationToken, 3600);

			await emailQueue.add({
				to: email,
				template: EmailTemplate.VERIFY_EMAIL,
				data: {
					name,
					verificationUrl: `${process.env.CLIENT_URL}/email-verify/${verificationToken}`,
				},
			});

			return {
				user: getInfoData({ fields: ['_id', 'name', 'email', 'status'], object: newUser }),
				tokens,
			};
		} catch (error) {
			await User.deleteOne({ _id: newUser._id });
			throw error;
		}
	}
	return null;
};

// 1. Check if user already exists
// 2. Check if password is correct
// 3. Create a new key token
// 4. Get balance
const login = async ({ email, password }: { email: string; password: string; refreshToken?: string }) => {
	const existUser = await UserServices.findByEmail({ email });
	if (!existUser) {
		throw new BadRequestError('Error: User does not exist');
	}
	const match = await bcrypt.compare(password, existUser.password);
	if (!match) {
		throw new AuthFailureError('Error: Authentication failed');
	}
	const privateKey = crypto.randomBytes(64).toString('hex');
	const publicKey = crypto.randomBytes(64).toString('hex');
	const tokens = await AuthUtils.createTokenPair({ userId: existUser._id, email }, publicKey, privateKey);
	await KeyTokenServices.createKeyToken(existUser._id, publicKey, privateKey, tokens.refreshToken);
	return {
		user: {
			...getInfoData({ fields: ['_id', 'name', 'email'], object: existUser }),
		},
		tokens,
	};
};

/**
 * Logout user
 * @param keyStoreId ID of the key store
 * @returns Deleted key store
 */
const logout = async ({ keyStoreId }: { keyStoreId: Types.ObjectId }) => {
	console.log('keyStoreId', keyStoreId);
	const deletedKey = await KeyTokenServices.deleteKeyById(keyStoreId);
	console.log('deletedKey', deletedKey);
	return deletedKey;
};

/**
 * Handle refresh token
 * @param refreshToken Refresh token
 * @returns New tokens
 */
const handleRefreshToken = async ({ refreshToken }: { refreshToken: string }) => {
	const foundToken = await KeyTokenServices.findByRefreshTokenUsed(refreshToken);
	if (foundToken) {
		const { userId, email } = (await AuthUtils.verifyJWT(refreshToken, foundToken.privateKey)) as {
			userId: string;
			email: string;
		};
		console.log('Email sent to user', email);
		await KeyTokenServices.deleteByUserId(new Types.ObjectId(userId));
		throw new FobbidenError('Something went wrong! Please login again.');
	}
	const existToken = await KeyTokenServices.findByRefreshToken(refreshToken);
	if (!existToken) {
		throw new NotFoundError('Token not found');
	}
	const { userId, email } = (await AuthUtils.verifyJWT(refreshToken, existToken.privateKey)) as {
		userId: string;
		email: string;
	};

	const foundUser = await UserServices.findByEmail({ email });
	if (!foundUser) {
		throw new NotFoundError('User not found');
	}
	const tokens = await AuthUtils.createTokenPair({ userId, email }, existToken.publicKey, existToken.privateKey);

	await existToken.updateOne({
		$set: {
			refreshToken: tokens.refreshToken,
		},
		$addToSet: {
			refreshTokensUsed: refreshToken,
		},
	});
	return {
		user: getInfoData({ fields: ['_id', 'name', 'email'], object: foundUser }),
		tokens,
	};
};

/**
 * Verify user email
 * @param email Email of the user
 * @param token Verification token
 * @returns Verified user
 */
const verifyEmail = async ({ email, token }: { email: string; token: string }) => {
	const user = await UserServices.findByEmail({ email });
	if (!user) {
		throw new NotFoundError('User not found');
	}

	// check if user already verified
	if (user.verified) {
		throw new BadRequestError('Email already verified');
	}

	// Get token from Redis
	const storedToken = await getCache(`email_verify_${email}`);
	if (!storedToken) {
		throw new AuthFailureError('Verification token has expired');
	}

	// Verify token
	if (storedToken !== token) {
		throw new AuthFailureError('Invalid verification token');
	}

	// Update user status
	await UserServices.updateUser(user._id, {
		status: UserConstants.UserStatus.ACTIVE,
		verified: true,
	});

	// Delete token from Redis
	await deleteCache(`email_verify_${email}`);

	return {
		verified: true,
		message: 'Email verified successfully',
	};
};

/**
 * Resend verification email
 * @param data Data of the user
 * @returns Resent verification email
 */
const resendVerificationEmail = async (data: { email: string }) => {
	// Check user exists
	const user = await UserServices.findByEmail({ email: data.email });
	if (!user) {
		throw new NotFoundError('User not found');
	}

	// Check if user is verified
	if (user.verified) {
		throw new BadRequestError('Email already verified');
	}

	// Check if user is active
	if (user.status === 'active') {
		throw new BadRequestError('User already active');
	}

	try {
		// Delete old token before creating new token
		await deleteCache(`email_verify_${data.email}`);

		// Create and save new token
		const verificationToken = generateRandomToken();
		await setCache(`email_verify_${data.email}`, verificationToken, 3600);

		// Send email with new token
		await emailQueue.add({
			to: data.email,
			template: EmailTemplate.VERIFY_EMAIL,
			data: {
				name: user.name,
				verificationUrl: `${process.env.CLIENT_URL}/email-verify/${verificationToken}`,
			},
		});

		return {
			success: true,
			message: 'Verification email resent successfully',
		};
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw new BadRequestError('Failed to resend verification email');
	}
};

export default {
	signUp,
	login,
	logout,
	handleRefreshToken,
	verifyEmail,
	resendVerificationEmail,
};
