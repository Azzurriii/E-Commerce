import { ObjectId } from 'mongodb';
import Category from '@models/category.model';
import categoriesData from './categories.data';

export const seedCategories = async () => {
	try {
		// Check if categories already seeded
		const existingCategories = await Category.find({});
		if (existingCategories.length > 0) {
			console.log('Categories already seeded');
			return;
		}

		// Format data from JSON
		const categories = categoriesData.map((category: any) => ({
			...category,
			_id: new ObjectId(category._id),
			products: category.products?.map((productId: any) => new ObjectId(productId)) || [],
		}));

		// Import to DB
		await Category.insertMany(categories);
		console.log('✅ Categories seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding categories:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
