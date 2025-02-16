import { NextFunction, Request, Response } from 'express';
import AccessServices from '@services/access.service';
import { CREATED, OK } from '@handlers/response-handler';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Register successfully',
		data: await AccessServices.signUp(req.body),
	}).send(res);
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Login successfully',
		data: await AccessServices.login(req.body),
	}).send(res);
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Logout successfully',
		data: await AccessServices.logout({ keyStoreId: req.body.keyStore._id }),
	}).send(res);
};

const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Refresh token successfully',
		data: await AccessServices.handleRefreshToken(req.body),
	}).send(res);
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
	const { email, token } = req.body;
	const result = await AccessServices.verifyEmail({ email, token });
	return new OK({
		message: 'Email verified successfully',
		data: result,
	}).send(res);
};

const resendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;
	return new OK({
		message: 'Verification email resent successfully',
		data: await AccessServices.resendVerificationEmail({ email }),
	}).send(res);
};

export default {
	signUp,
	login,
	logout,
	handleRefreshToken,
	verifyEmail,
	resendVerificationEmail,
};
