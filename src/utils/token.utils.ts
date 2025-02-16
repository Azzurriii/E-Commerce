import crypto from 'crypto';

export const generateRandomToken = (length: number = 32): string => {
	return crypto.randomBytes(length).toString('hex');
};
