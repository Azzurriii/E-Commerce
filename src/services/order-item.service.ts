import OrderItem from '@models/order-item.model';
import { ICreateOrderItem, IUpdateOrderItem } from '@interfaces/order-item';
import { NotFoundError } from '@handlers/response-handler';

// create order item service
const addOrderItem = async (data: ICreateOrderItem) => {
	const orderItem = await OrderItem.create(data);
	return orderItem;
};

// get all order item
const getOrderItems = async () => {
	const orderItem = await OrderItem.find({});
	return orderItem;
};

// delete order item
const deleteOrderItem = async (id: string) => {
	const result = await OrderItem.findByIdAndDelete(id);
	return result;
};

// update order item
const updateOrderItem = async (id: string, payload: IUpdateOrderItem) => {
	await getOrderItem(id);
	const result = await OrderItem.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// get single order item
const getOrderItem = async (id: string) => {
	const result = await OrderItem.findById(id);
	if (!result) {
		throw new NotFoundError('Category not found !');
	}
	return result;
};

// get order item by order id
const getOrderItemByOrderId = async (orderId: string) => {
	const result = await OrderItem.find({ order_id: orderId });
	return result;
};

export default {
	addOrderItem,
	getOrderItems,
	deleteOrderItem,
	updateOrderItem,
	getOrderItem,
	getOrderItemByOrderId,
};
