import UserPayment from '@models/payment.model';
import Product from '@models/product.model';
import { ICreatePayment, IUpdatePayment } from '@interfaces/payment';
import { NotFoundError } from '@handlers/response-handler';

// create payment service
const addPayment = async (data: ICreatePayment) => {
	const payment = await UserPayment.create(data);
	return payment;
};

// get all payment
const getPayments = async () => {
	const payment = await UserPayment.find({});
	return payment;
};

// delete payment
const deletePayment = async (id: string) => {
	const result = await UserPayment.findByIdAndDelete(id);
	return result;
};

// update payment
const updatePayment = async (id: string, payload: IUpdatePayment) => {
	await getPayment(id);
	const result = await UserPayment.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// get single payment
const getPayment = async (id: string) => {
	const result = await UserPayment.findById(id);
	if (!result) {
		throw new NotFoundError('Payment not found !');
	}
	return result;
};

export default {
	addPayment,
	getPayments,
	deletePayment,
	updatePayment,
	getPayment,
};
