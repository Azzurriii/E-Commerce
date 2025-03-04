// import { Request, Response, NextFunction } from 'express';
// import UserOrderService from '@services/user.order.service';
// import { OK } from '@handlers/response-handler';
// // get all orders user
// const getOrderByUser = async (req: Request, res: Response, next: NextFunction) => {
// 	return new OK({
// 		message: 'Register successfully',
// 		data: await UserOrderService.getOrderByUser(req.body.userId),
// 	}).send(res);
// };

// // getOrderById
// const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
// 	return new OK({
// 		message: 'Order found',
// 		data: await UserOrderService.getOrderById(req.params.id),
// 	}).send(res);
// };

// // getDashboardAmount
// const getDashboardAmount = async (req: Request, res: Response, next: NextFunction) => {
// 	return new OK({
// 		message: 'Dashboard amount',
// 		data: await UserOrderService.getDashboardAmount(),
// 	}).send(res);
// };
// // get sales report
// const getSalesReport = async (req: Request, res: Response, next: NextFunction) => {
// 	return new OK({
// 		message: 'Sales report',
// 		data: await UserOrderService.getSalesReport(),
// 	}).send(res);
// };

// // Most Selling Category
// const mostSellingCategory = async (req: Request, res: Response, next: NextFunction) => {
// 	return new OK({
// 		message: 'Most selling category',
// 		data: await UserOrderService.mostSellingCategory(),
// 	}).send(res);
// };

// // dashboard recent order
// const getDashboardRecentOrder = async (req: Request, res: Response, next: NextFunction) => {
// 	return new OK({
// 		message: 'Dashboard recent order',
// 		data: await UserOrderService.getDashboardRecentOrder(),
// 	}).send(res);
// };

// export default {
// 	getOrderByUser,
// 	getOrderById,
// 	getDashboardAmount,
// 	getSalesReport,
// 	mostSellingCategory,
// 	getDashboardRecentOrder,
// };
