import { ObjectId } from 'mongodb';
import Brand from '@models/brand.model';
import brandsData from './brands.data';

export const seedBrands = async () => {
	try {
		// Check if brands already seeded
		const existingBrands = await Brand.find({});
		if (existingBrands.length > 0) {
			console.log('Brands already seeded');
			return;
		}

		// Format data from JSON
		const brands = brandsData.map((brand: any) => ({
			...brand,
			_id: new ObjectId(brand._id),
			products: brand.products?.map((productId: any) => new ObjectId(productId)) || [],
		}));

		// Import to DB
		await Brand.insertMany(brands);
		console.log('✅ Brands seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding brands:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
