import { ObjectId } from 'mongodb';
import OrderItems from '@models/order-item.model';
import orderItemsData from './order-items.data';

export const seedOrderItems = async () => {
	try {
		// Check if order items already seeded
		const existingOrderItems = await OrderItems.find({});
		if (existingOrderItems.length > 0) {
			console.log('Order items already seeded');
			return;
		}

		// Format data from JSON
		const orderItems = orderItemsData.map((item: any) => ({
			...item,
			_id: new ObjectId(item._id),
			order_id: new ObjectId(item.order_id),
			product_id: new ObjectId(item.product_id),
		}));

		// Import to DB
		await OrderItems.insertMany(orderItems);
		console.log('✅ Order items seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding order items:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
