import KeyTokenModel from '@models/key-token.model';
import { Types } from 'mongoose';

const createKeyToken = async (userId: Types.ObjectId, publicKey: any, privateKey: any, refreshToken: string) => {
	try {
		const filters = { user: userId },
			update = { publicKey, privateKey, refreshToken, refreshTokensUsed: [] },
			options = { new: true, upsert: true };
		const tokens = await KeyTokenModel.findOneAndUpdate(filters, update, options);
		return tokens ? tokens.publicKey : null;
	} catch (error) {
		return error;
	}
};

const findByUserId = async (userId: Types.ObjectId) => {
	const tokens = await KeyTokenModel.findOne({ user: userId });
	return tokens ? tokens : null;
};

const deleteKeyById = async (keyStoreId: Types.ObjectId) => {
	return await KeyTokenModel.deleteOne({ _id: keyStoreId });
};

const findByRefreshTokenUsed = async (refreshToken: string) => {
	return await KeyTokenModel.findOne({ refreshTokensUsed: refreshToken });
};

const findByRefreshToken = async (refreshToken: string) => {
	return await KeyTokenModel.findOne({ refreshToken });
};

const deleteByUserId = async (userId: Types.ObjectId) => {
	return await KeyTokenModel.deleteOne({ user: userId });
};

export default {
	createKeyToken,
	findByUserId,
	deleteKeyById,
	findByRefreshTokenUsed,
	deleteByUserId,
	findByRefreshToken,
};
