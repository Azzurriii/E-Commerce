import Order from '@models/order.model';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Types } from 'mongoose';
import { NotFoundError } from '@handlers/response-handler';
import { IUserSalesReport } from '@interfaces/user-order';

// Apply necessary plugins to dayjs
dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

// get all orders user
const getOrderByUser = async (userId: string) => {
	const totalDoc = await Order.countDocuments({ user: userId });

	// total padding order count
	const totalPendingOrder = await Order.aggregate([
		{
			$match: {
				status: 'pending',
				user: new Types.ObjectId(userId),
			},
		},
		{
			$group: {
				_id: null,
				total: { $sum: '$totalAmount' },
				count: {
					$sum: 1,
				},
			},
		},
	]);

	// total padding order count
	const totalProcessingOrder = await Order.aggregate([
		{
			$match: {
				status: 'processing',
				user: new Types.ObjectId(userId),
			},
		},
		{
			$group: {
				_id: null,
				total: { $sum: '$totalAmount' },
				count: {
					$sum: 1,
				},
			},
		},
	]);

	const totalDeliveredOrder = await Order.aggregate([
		{
			$match: {
				status: 'delivered',
				user: new Types.ObjectId(userId),
			},
		},
		{
			$group: {
				_id: null,
				total: { $sum: '$totalAmount' },
				count: {
					$sum: 1,
				},
			},
		},
	]);

	// today order amount

	// query for orders
	const orders = await Order.find({ user: userId }).sort({ _id: -1 });
	return {
		orders,
		pending: totalPendingOrder.length === 0 ? 0 : totalPendingOrder[0].count,
		processing: totalProcessingOrder.length === 0 ? 0 : totalProcessingOrder[0].count,
		delivered: totalDeliveredOrder.length === 0 ? 0 : totalDeliveredOrder[0].count,

		totalDoc,
	};
};

// getOrderById
const getOrderById = async (id: string) => {
	const order = await Order.findById(id);
	if (!order) {
		throw new NotFoundError('Order not found');
	}
	return order;
};

// getDashboardAmount
const getDashboardAmount = async () => {
	const todayStart = dayjs().startOf('day');
	const todayEnd = dayjs().endOf('day');

	const yesterdayStart = dayjs().subtract(1, 'day').startOf('day');
	const yesterdayEnd = dayjs().subtract(1, 'day').endOf('day');

	const monthStart = dayjs().startOf('month');
	const monthEnd = dayjs().endOf('month');

	const todayOrders = await Order.find({
		createdAt: { $gte: todayStart.toDate(), $lte: todayEnd.toDate() },
	});

	let todayCashPaymentAmount = 0;
	let todayCardPaymentAmount = 0;

	todayOrders.forEach((order) => {
		if (order.paymentMethod === 'COD') {
			todayCashPaymentAmount += order.totalAmount;
		} else if (order.paymentMethod === 'Card') {
			todayCardPaymentAmount += order.totalAmount;
		}
	});

	const yesterdayOrders = await Order.find({
		createdAt: { $gte: yesterdayStart.toDate(), $lte: yesterdayEnd.toDate() },
	});

	let yesterDayCashPaymentAmount = 0;
	let yesterDayCardPaymentAmount = 0;

	yesterdayOrders.forEach((order) => {
		if (order.paymentMethod === 'COD') {
			yesterDayCashPaymentAmount += order.totalAmount;
		} else if (order.paymentMethod === 'Card') {
			yesterDayCardPaymentAmount += order.totalAmount;
		}
	});

	const monthlyOrders = await Order.find({
		createdAt: { $gte: monthStart.toDate(), $lte: monthEnd.toDate() },
	});

	const totalOrders = await Order.find();
	const todayOrderAmount = todayOrders.reduce((total, order) => total + order.totalAmount, 0);
	const yesterdayOrderAmount = yesterdayOrders.reduce((total, order) => total + order.totalAmount, 0);

	const monthlyOrderAmount = monthlyOrders.reduce((total, order) => {
		return total + order.totalAmount;
	}, 0);
	const totalOrderAmount = totalOrders.reduce((total, order) => total + order.totalAmount, 0);
	return {
		todayOrderAmount,
		yesterdayOrderAmount,
		monthlyOrderAmount,
		totalOrderAmount,
		todayCardPaymentAmount,
		todayCashPaymentAmount,
		yesterDayCardPaymentAmount,
		yesterDayCashPaymentAmount,
	};
};
// get sales report
const getSalesReport = async () => {
	const startOfWeek = new Date();
	startOfWeek.setDate(startOfWeek.getDate() - 7);

	const salesOrderChartData = await Order.find({
		updatedAt: {
			$gte: startOfWeek,
			$lte: new Date(),
		},
	}).lean();

	const salesReport = salesOrderChartData.reduce<IUserSalesReport>((res, value) => {
		const onlyDate = value.updatedAt?.toISOString().split('T')[0] || 'unknown';
		if (!res[onlyDate]) {
			res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
		}
		res[onlyDate].total += value.totalAmount;
		res[onlyDate].order += 1;
		return res;
	}, {});

	return Object.values(salesReport);
};

// Most Selling Category
const mostSellingCategory = async () => {
	const categoryData = await Order.aggregate([
		{
			$unwind: '$cart', // Deconstruct the cart array
		},
		{
			$group: {
				_id: '$cart.productType',
				count: { $sum: '$cart.orderQuantity' },
			},
		},
		{
			$sort: { count: -1 },
		},
		{
			$limit: 5,
		},
	]);

	return categoryData;
};

// dashboard recent order
const getDashboardRecentOrder = async () => {
	const queryObject = {
		status: { $in: ['pending', 'processing', 'delivered', 'cancel'] },
	};

	const totalDoc = await Order.countDocuments(queryObject);

	const orders = await Order.aggregate([
		{ $match: queryObject },
		{ $sort: { updatedAt: -1 } },
		{
			$project: {
				invoice: 1,
				createdAt: 1,
				updatedAt: 1,
				paymentMethod: 1,
				name: 1,
				user: 1,
				totalAmount: 1,
				status: 1,
			},
		},
	]);

	return {
		orders: orders,
		totalOrder: totalDoc,
	};
};

export default {
	getOrderByUser,
	getOrderById,
	getDashboardAmount,
	getSalesReport,
	mostSellingCategory,
	getDashboardRecentOrder,
};
