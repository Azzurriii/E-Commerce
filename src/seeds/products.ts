import { ObjectId } from 'mongodb';
import Product from '@models/product.model';
import productsData from './products.data';

export const seedProducts = async () => {
	try {
		// Check if products already seeded
		const existingProducts = await Product.find({});
		if (existingProducts.length > 0) {
			console.log('Brands already seeded');
			return;
		}

		// Format data from JSON
		const products = productsData.map((product: any) => ({
			...product,
			_id: new ObjectId(product._id),
			products: product.products?.map((productId: any) => new ObjectId(productId)) || [],
		}));

		// Import to DB
		await Product.insertMany(products);
		console.log('✅ Products seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding brands:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
