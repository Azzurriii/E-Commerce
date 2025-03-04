import { ObjectId } from 'mongodb';
import Inventory from '@models/inventory.model';
import inventoriesData from './inventories.data';

export const seedInventories = async () => {
	try {
		// Check if inventories already seeded
		const existingInventories = await Inventory.find({});
		if (existingInventories.length > 0) {
			console.log('Inventories already seeded');
			return;
		}

		// Format data from JSON
		const inventories = inventoriesData.map((inventory: any) => ({
			...inventory,
			_id: new ObjectId(inventory._id),
		}));

		// Import to DB
		await Inventory.insertMany(inventories);
		console.log('✅ Inventories seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding inventories:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
