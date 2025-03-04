import { ObjectId } from 'mongodb';
import UserAddress from '@models/user-address.model';
import userAddressesData from './user-addresses.data';

export const seedUserAddresses = async () => {
	try {
		// Check if user addresses already seeded
		const existingUserAddresses = await UserAddress.find({});
		if (existingUserAddresses.length > 0) {
			console.log('User addresses already seeded');
			return;
		}

		// Format data from JSON
		const userAddresses = userAddressesData.map((address: any) => ({
			...address,
			_id: new ObjectId(address._id),
			user_id: new ObjectId(address.user_id),
		}));

		// Import to DB
		await UserAddress.insertMany(userAddresses);
		console.log('✅ User addresses seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding user addresses:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
