import { ObjectId } from 'mongodb';
import Review from '@models/review.model';
import reviewsData from './reviews.data';

export const seedReviews = async () => {
	try {
		// Check if products already seeded
		const existingReviews = await Review.find({});
		if (existingReviews.length > 0) {
			console.log('Reviews already seeded');
			return;
		}

		// Format data from JSON
		const reviews = reviewsData.map((review: any) => ({
			...review,
			_id: new ObjectId(review._id),
			productId: new ObjectId(review.productId),
			userId: new ObjectId(review.userId),
		}));

		// Import to DB
		await Review.insertMany(reviews);
		console.log('✅ Reviews seeded successfully');
	} catch (error) {
		console.error('❌ Error seeding reviews:', error);
		throw error; // Throw to catch error in seed.ts
	}
};
