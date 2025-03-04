import { ObjectId } from 'mongodb';
import Cart from '@models/cart.model';
import cartsData from './carts.data';

export const seedCarts = async () => {
	try {
		// Check if carts already seeded
		const existingCarts = await Cart.find({});
		if (existingCarts.length > 0) {
			console.log('Carts already seeded');
			return;
		}

		// Format data from JSON
		const carts = cartsData.map((cart: any) => ({
			...cart,
			_id: new ObjectId(cart._id),
			user_id: new ObjectId(cart.user_id),
		}));

		// Import to DB
		await Cart.insertMany(carts);
		console.log('✅ Carts seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding carts:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
