import { ObjectId } from 'mongodb';
import Payment from '@models/payment.model';
import paymentsData from './payments.data';

export const seedPayments = async () => {
	try {
		// Check if payments already seeded
		const existingPayments = await Payment.find({});
		if (existingPayments.length > 0) {
			console.log('Payments already seeded');
			return;
		}

		// Format data from JSON
		const payments = paymentsData.map((payment: any) => ({
			...payment,
			_id: new ObjectId(payment._id),
			order_id: new ObjectId(payment.order_id),
		}));

		// Import to DB
		await Payment.insertMany(payments);
		console.log('✅ Payments seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding payments:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
