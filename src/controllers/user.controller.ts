import { NextFunction, Request, Response } from 'express';
import UserServices from '@services/user.service';
import { OK } from '@handlers/response-handler';

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Reset password link sent to your email',
		data: await UserServices.forgotPassword(req.body.email),
	}).send(res);
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Password reset successfully',
		data: await UserServices.resetPassword(req.body.email, req.body.password, req.body.token),
	}).send(res);
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Password changed successfully',
		data: await UserServices.changePassword(req.body.email, req.body.oldPassword, req.body.newPassword),
	}).send(res);
};

export default {
	forgotPassword,
	resetPassword,
	changePassword,
};
