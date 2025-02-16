import ApiKeyModel from '@models/api-key.model';
import crypto from 'crypto';

const findById = async (key: string) => {
	// const apiKey = await ApiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });
	const objKey = await ApiKeyModel.findOne({ key, status: true }).lean();
	return objKey;
};

export default {
	findById,
};
