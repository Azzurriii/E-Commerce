import { ObjectId } from 'mongodb';
import Order from '@models/order.model';
import ordersData from './orders.data';

export const seedOrders = async () => {
	try {
		// Check if orders already seeded
		const existingOrders = await Order.find({});
		if (existingOrders.length > 0) {
			console.log('Orders already seeded');
			return;
		}

		// Format data from JSON
		const orders = ordersData.map((order: any) => ({
			...order,
			_id: new ObjectId(order._id),
			user_id: new ObjectId(order.user_id),
			payment_id: new ObjectId(order.payment_id),
			total: order.total, // Decimal128 will be converted automatically by Mongoose
		}));

		// Import to DB
		await Order.insertMany(orders);
		console.log('✅ Orders seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding orders:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
