import PaymentService from '@services/payment.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
// add payment
const addPayment = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Payment created successfully',
		data: await PaymentService.addPayment(req.body),
	}).send(res);
};

// get all payment
const getPayments = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payments fetched successfully',
		data: await PaymentService.getPayments(),
	}).send(res);
};

// delete payment
const deletePayment = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payment deleted successfully',
		data: await PaymentService.deletePayment(req.params.id),
	}).send(res);
};

// update payment
const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payment updated successfully',
		data: await PaymentService.updatePayment(req.params.id, req.body),
	}).send(res);
};

// get single payment
const getPayment = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Payment fetched successfully',
		data: await PaymentService.getPayment(req.params.id),
	}).send(res);
};

export default {
	addPayment,
	getPayments,
	deletePayment,
	updatePayment,
	getPayment,
};
