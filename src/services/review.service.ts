import Review from '@models/review.model';
import { ICreateReview } from '@interfaces/review';

const createReview = async (data: ICreateReview) => {
	const review = await Review.create(data);
	return review;
};

const getReviews = async (page: number, limit: number) => {
	const skip = (page - 1) * limit;
	const reviews = await Review.find({}).skip(skip).limit(limit);
	return reviews;
};

const getReviewByRating = async (rating: number, page: number, limit: number) => {
	const skip = (page - 1) * limit;
	const reviews = await Review.find({ rating: rating }).skip(skip).limit(limit);
	return reviews;
};

const getReviewByProductId = async (productId: string, page: number, limit: number) => {
	const skip = (page - 1) * limit;
	const reviews = await Review.find({ product_id: productId }).skip(skip).limit(limit);
	return reviews;
};

export default { createReview, getReviews, getReviewByRating, getReviewByProductId };
