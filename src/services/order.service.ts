import OrderDetails from '@models/order.model';
import { ICreateOrder, IUpdateOrder } from '@interfaces/order';
import { NotFoundError } from '@handlers/response-handler';

// create order service
const addOrderDetails = async (data: ICreateOrder) => {
	const order = await OrderDetails.create(data);
	return order;
};

// get all order
const getOrdersDetails = async () => {
	const order = await OrderDetails.find({});
	return order;
};

// delete order
const deleteOrderDetails = async (id: string) => {
	const result = await OrderDetails.findByIdAndDelete(id);
	return result;
};

// update order
const updateOrderDetails = async (id: string, payload: IUpdateOrder) => {
	await getOrderDetails(id);
	const result = await OrderDetails.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// get single order
const getOrderDetails = async (id: string) => {
	const result = await OrderDetails.findById(id);
	if (!result) {
		throw new NotFoundError('Order not found !');
	}
	return result;
};

export default {
	addOrderDetails,
	getOrdersDetails,
	deleteOrderDetails,
	updateOrderDetails,
	getOrderDetails,
};
