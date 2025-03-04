import OrderItemService from '@services/order-item.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
// add order item
const addOrderItem = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Order item created successfully',
		data: await OrderItemService.addOrderItem(req.body),
	}).send(res);
};

// get all order item
const getOrderItems = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Order items fetched successfully',
		data: await OrderItemService.getOrderItems(),
	}).send(res);
};

// delete order item
const deleteOrderItem = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Order item deleted successfully',
		data: await OrderItemService.deleteOrderItem(req.params.id),
	}).send(res);
};

// update order item
const updateOrderItem = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Order item updated successfully',
		data: await OrderItemService.updateOrderItem(req.params.id, req.body),
	}).send(res);
};

// get single order item
const getOrderItem = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Order item fetched successfully',
		data: await OrderItemService.getOrderItem(req.params.id),
	}).send(res);
};

// get order item by order id
const getOrderItemByOrderId = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Order item fetched successfully',
		data: await OrderItemService.getOrderItemByOrderId(req.params.orderId),
	}).send(res);
};

export default {
	addOrderItem,
	getOrderItems,
	deleteOrderItem,
	updateOrderItem,
	getOrderItem,
	getOrderItemByOrderId,
};
