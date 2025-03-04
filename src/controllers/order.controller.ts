import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
import OrderDetailsService from '@services/order.service';

// add order
const addOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Order created successfully',
		data: await OrderDetailsService.addOrderDetails(req.body),
	}).send(res);
};

// get all order
const getOrdersDetails = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Orders fetched successfully',
		data: await OrderDetailsService.getOrdersDetails(),
	}).send(res);
};

// delete order
const deleteOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Order deleted successfully',
		data: await OrderDetailsService.deleteOrderDetails(req.params.id),
	}).send(res);
};

// update order
const updateOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Order updated successfully',
		data: await OrderDetailsService.updateOrderDetails(req.params.id, req.body),
	}).send(res);
};

// get single order
const getOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Order fetched successfully',
		data: await OrderDetailsService.getOrderDetails(req.params.id),
	}).send(res);
};

export default {
	addOrderDetails,
	getOrdersDetails,
	deleteOrderDetails,
	updateOrderDetails,
	getOrderDetails,
};
