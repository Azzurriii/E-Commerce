import JWT from 'jsonwebtoken';
import { BadRequestError } from '@handlers/response-handler';

const createTokenPair = async (
	payload: any,
	publicKey: any,
	privateKey: any,
): Promise<{ refreshToken: string; accessToken: string }> => {
	try {
		const accessToken = await JWT.sign(payload, publicKey, {
			expiresIn: '1 days',
		});

		const refreshToken = await JWT.sign(payload, privateKey, {
			expiresIn: '7 days',
		});

		JWT.verify(accessToken, publicKey, (err: any, decode: any) => {
			if (err) {
				console.error(`error verify:`, err);
			} else {
				console.info('decode in createTokenPair:', decode);
			}
		});
		return { accessToken, refreshToken };
	} catch (error) {
		throw new BadRequestError('Error in createTokenPair');
	}
};

const verifyJWT = async (token: string, secretKey: string) => {
	return await JWT.verify(token, secretKey);
};

export default {
	createTokenPair,
	verifyJWT,
};
