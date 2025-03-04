import { ObjectId } from 'mongodb';
import CartItem from '@models/cart-item.model';
import cartItemsData from './cart-items.data';

export const seedCartItems = async () => {
	try {
		// Check if cart items already seeded
		const existingCartItems = await CartItem.find({});
		if (existingCartItems.length > 0) {
			console.log('Cart items already seeded');
			return;
		}

		// Format data from JSON
		const cartItems = cartItemsData.map((item: any) => ({
			...item,
			_id: new ObjectId(item._id),
			cart_id: new ObjectId(item.cart_id),
			product_id: new ObjectId(item.product_id),
		}));

		// Import to DB
		await CartItem.insertMany(cartItems);
		console.log('✅ Cart items seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding cart items:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
