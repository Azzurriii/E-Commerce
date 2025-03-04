import UserPaymentService from '@services/user-payment.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';

// Thêm phương thức thanh toán
const addUserPayment = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Payment method added successfully',
		data: await UserPaymentService.addUserPayment(req.body),
	}).send(res);
};

// Lấy tất cả phương thức thanh toán
const getUserPayments = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payment methods fetched successfully',
		data: await UserPaymentService.getUserPayments(),
	}).send(res);
};

// Xóa phương thức thanh toán
const deleteUserPayment = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payment method deleted successfully',
		data: await UserPaymentService.deleteUserPayment(req.params.id),
	}).send(res);
};

// Cập nhật phương thức thanh toán
const updateUserPayment = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payment method updated successfully',
		data: await UserPaymentService.updateUserPayment(req.params.id, req.body),
	}).send(res);
};

// Lấy một phương thức thanh toán
const getUserPayment = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payment method fetched successfully',
		data: await UserPaymentService.getUserPayment(req.params.id),
	}).send(res);
};

// Lấy phương thức thanh toán theo user ID
const getUserPaymentByUserId = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payment methods fetched successfully',
		data: await UserPaymentService.getUserPaymentByUserId(req.params.userId),
	}).send(res);
};

// Đặt phương thức thanh toán mặc định
const setDefaultPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Default payment method set successfully',
		data: await UserPaymentService.setDefaultPaymentMethod(req.params.id, req.body.userId),
	}).send(res);
};

export default {
	addUserPayment,
	getUserPayments,
	deleteUserPayment,
	updateUserPayment,
	getUserPayment,
	getUserPaymentByUserId,
	setDefaultPaymentMethod,
};
