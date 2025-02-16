import { NextFunction, Request, Response } from 'express';
import ApiKeyServices from '@services/api-key.service';
import KeyTokenServices from '@services/key-token.service';
import UserServices from '@services/user.service';
import { AuthFailureError, NotFoundError } from '@handlers/response-handler';
import { Types } from 'mongoose';
import JWT from 'jsonwebtoken';

const HEADER = {
	API_KEY: 'x-api-key',
	AUTHORIZATION: 'authorization',
	CLIENT_ID: 'x-client-id',
};

const checkApiKey = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const key = req.headers[HEADER.API_KEY]?.toString();
		if (!key) {
			return res.status(403).json({
				message: 'Forbidden Error',
			});
		}
		const apiKey = await ApiKeyServices.findById(key);
		if (!apiKey) {
			return res.status(403).json({
				message: 'Forbidden Error',
			});
		}
		req.body.apiKey = apiKey;
		next();
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

const checkPermission = (permission: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.apiKey.permissions) {
			return res.status(403).json({
				message: 'Forbidden Error',
			});
		}
		const validPermission = req.body.apiKey.permissions.includes(permission);
		if (!validPermission) {
			return res.status(403).json({
				message: 'Forbidden Error',
			});
		}
		return next();
	};
};

const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.headers[HEADER.CLIENT_ID];
	if (!userId) {
		return res.status(401).json({
			message: 'Error: Invalid Request',
		});
	}
	const keyStore = await KeyTokenServices.findByUserId(new Types.ObjectId(userId?.toString()));
	if (!keyStore) {
		return res.status(404).json({
			message: 'Error: Key store not found',
		});
	}
	const accessToken = req.headers[HEADER.AUTHORIZATION];
	if (!accessToken) {
		return res.status(401).json({
			message: 'Error: Invalid Request',
		});
	}
	try {
		console.log('accessToken', accessToken);
		const decode = (await JWT.verify(accessToken.toString(), keyStore.publicKey)) as { userId: string };
		console.log('decode', decode);
		if (userId.toString() !== decode.userId.toString()) {
			return res.status(401).json({
				message: 'Error: Invalid User',
			});
		}
		req.body.keyStore = keyStore;
		req.body.userId = decode.userId;
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error', error });
	}
	next();
};

const checkAdminUser = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.headers[HEADER.CLIENT_ID];
	const user = await UserServices.findById(new Types.ObjectId(userId?.toString()));
	if (!user) {
		return res.status(404).json({
			message: 'Error: User not found',
		});
	}
	if (!user.roles.includes('ADMIN')) {
		return res.status(401).json({
			message: 'Error: Invalid User',
		});
	}
	next();
};

const checkSuperAdminUser = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.headers[HEADER.CLIENT_ID];
	const user = await UserServices.findById(new Types.ObjectId(userId?.toString()));
	if (!user) {
		return res.status(404).json({
			message: 'Error: User not found',
		});
	}
	if (!user.roles.includes('SUPER_ADMIN')) {
		return res.status(401).json({
			message: 'Error: Invalid User',
		});
	}
	next();
};

export default {
	checkApiKey,
	checkPermission,
	checkAuthentication,
	checkAdminUser,
	checkSuperAdminUser,
};
