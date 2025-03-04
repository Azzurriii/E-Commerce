import { ObjectId } from 'mongodb';
import UserPayment from '@models/user-payment.model';
import userPaymentsData from './user-payments.data';

export const seedUserPayments = async () => {
	try {
		// Check if user payments already seeded
		const existingUserPayments = await UserPayment.find({});
		if (existingUserPayments.length > 0) {
			console.log('User payments already seeded');
			return;
		}

		// Format data from JSON
		const userPayments = userPaymentsData.map((payment: any) => ({
			...payment,
			_id: new ObjectId(payment._id),
			user_id: new ObjectId(payment.user_id),
		}));

		// Import to DB
		await UserPayment.insertMany(userPayments);
		console.log('✅ User payments seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding user payments:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
