import { ObjectId } from 'mongodb';
import Discount from '@models/discount.model';
import discountsData from './discounts.data';

export const seedDiscounts = async () => {
	try {
		// Check if discounts already seeded
		const existingDiscounts = await Discount.find({});
		if (existingDiscounts.length > 0) {
			console.log('Discounts already seeded');
			return;
		}

		// Format data from JSON
		const discounts = discountsData.map((discount: any) => ({
			...discount,
			_id: new ObjectId(discount._id),
			discount_percent: discount.discount_percent, // Decimal128 will be converted automatically by Mongoose
		}));

		// Import to DB
		await Discount.insertMany(discounts);
		console.log('✅ Discounts seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding discounts:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
