import User from '@models/user.model';
import { Types } from 'mongoose';
import { NotFoundError, BadRequestError, AuthFailureError } from '@handlers/response-handler';
import bcrypt from 'bcrypt';
import { generateRandomToken } from '@utils/token.utils';
import { setCache, getCache, deleteCache } from '@services/redis.service';
import { emailQueue } from '@queues/email.queue';
import { EmailTemplate } from '@constants/mail';
/**
 * Find user by email
 * @param email Email of the user
 * @param select Select fields to return
 * @returns User object
 */
const findByEmail = async ({ email, select }: { email: string; select?: any }) => {
	const defaultSelect = {
		email: 1,
		password: 1,
		name: 1,
		status: 1,
		roles: 1,
	};

	return await User.findOne({ email }).select(select || defaultSelect);
};

/**
 * Find user by ID
 * @param id ID of the user
 * @returns User object
 */
const findById = async (id: Types.ObjectId) => {
	return await User.findById(id);
};

/**
 * Update user
 * @param id ID of the user
 * @param data Data to update
 * @returns User object
 */
const updateUser = async (id: Types.ObjectId, data: any) => {
	return await User.findByIdAndUpdate(id, data, { new: true });
};

const forgotPassword = async (email: string) => {
	const user = await findByEmail({ email });
	if (!user) {
		throw new NotFoundError('User not found');
	}

	// Generate reset token
	const resetToken = generateRandomToken();
	await setCache(`pwd_reset_${email}`, resetToken, 30 * 60); // TTL 30 minutes

	// Send reset email
	await emailQueue.add({
		to: email,
		template: EmailTemplate.RESET_PASSWORD,
		data: {
			name: user.name,
			resetUrl: `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
		},
	});

	return { email };
};

const resetPassword = async (email: string, password: string, token: string) => {
	const user = await findByEmail({ email });
	if (!user) {
		throw new NotFoundError('User not found');
	}

	// Verify token
	const storedToken = await getCache(`pwd_reset_${email}`);
	if (!storedToken || storedToken !== token) {
		throw new AuthFailureError('Invalid or expired reset token');
	}

	// Update password
	const passwordHash = await bcrypt.hash(password, 10);
	await User.updateOne({ email }, { password: passwordHash });

	// Delete reset token
	await deleteCache(`pwd_reset_${email}`);

	return { email };
};

const changePassword = async (email: string, oldPassword: string, newPassword: string) => {
	const user = await findByEmail({ email });
	if (!user) {
		throw new NotFoundError('User not found');
	}

	// Verify old password
	const isValidPassword = await bcrypt.compare(oldPassword, user.password);
	if (!isValidPassword) {
		throw new BadRequestError('Current password is incorrect');
	}

	// Check if new password is same as old
	if (oldPassword === newPassword) {
		throw new BadRequestError('New password must be different from current password');
	}

	// Update password
	const passwordHash = await bcrypt.hash(newPassword, 10);
	await User.updateOne({ email }, { password: passwordHash });

	return { email };
};

export default {
	findByEmail,
	findById,
	updateUser,
	forgotPassword,
	resetPassword,
	changePassword,
};
