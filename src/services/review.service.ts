import mongoose from 'mongoose';
import Order from '@models/order.model';
import Products from '@models/product.model';
import Review from '@models/review.model';
import User from '@models/user.model';
import { ICreateReview, IGetReviews } from '@interfaces/review';
import { BadRequestError, NotFoundError } from '@handlers/response-handler';

// add a review
const addReview = async (data: ICreateReview) => {
	const { userId, productId, rating, comment } = data;
	// Check if the user has already left a review for this product
	const existingReview = await Review.findOne({
		user: userId,
		product: productId,
	});

	if (existingReview) {
		throw new BadRequestError('You have already left a review for this product.');
	}
	const checkPurchase = await Order.findOne({
		user: new mongoose.Types.ObjectId(userId),
		'cart._id': { $in: [productId] },
	});
	if (!checkPurchase) {
		throw new BadRequestError('Without purchase you can not give here review!');
	}

	// Create the new review
	const review = await Review.create(data);

	// Update product
	await Products.findByIdAndUpdate(productId, {
		$push: { reviews: review._id },
	});

	// Update user - removed user.reviews since it's not in the schema
	await User.findByIdAndUpdate(userId, {
		$push: { reviews: review._id },
	});

	return review;
};

// get reviews
const getReviews = async (query: IGetReviews) => {
	const { productId, userId, rating } = query;
	const filter: any = {};

	if (productId) filter.productId = productId;
	if (userId) filter.userId = userId;
	if (rating) filter.rating = rating;

	const reviews = await Review.find(filter);
	return reviews;
};

// update a review
const updateReview = async (id: string, data: ICreateReview) => {
	const review = await Review.findByIdAndUpdate(id, data, { new: true });
	if (!review) {
		throw new NotFoundError('Review not found');
	}
	return review;
};

// delete a review
const deleteReviews = async (productId: string) => {
	const result = await Review.deleteMany({ productId: productId });
	if (result.deletedCount === 0) {
		throw new NotFoundError('Product reviews not found');
	}
	return { message: 'All reviews deleted for the product' };
};

export default {
	addReview,
	updateReview,
	getReviews,
	deleteReviews,
};
