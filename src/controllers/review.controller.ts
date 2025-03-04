import ReviewService from '@services/review.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';

const createReview = async (req: Request, res: Response, next: NextFunction) => {
	const { user_id, product_id, rating, comment } = req.body;
	const review = await ReviewService.createReview({ user_id, product_id, rating, comment });
	return new CREATED({
		message: 'Review created successfully',
		data: review,
	}).send(res);
};

const getReviews = async (req: Request, res: Response, next: NextFunction) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const reviews = await ReviewService.getReviews(page, limit);

	return new OK({
		message: 'Reviews fetched successfully',
		data: reviews,
	}).send(res);
};

const getReviewByRating = async (req: Request, res: Response, next: NextFunction) => {
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const rating = Number(req.params.rating);
	const reviews = await ReviewService.getReviewByRating(rating, page, limit);

	return new OK({
		message: 'Reviews fetched successfully',
		data: reviews,
	}).send(res);
};

const getReviewByProductId = async (req: Request, res: Response, next: NextFunction) => {
	const productId = req.params.productId;
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const reviews = await ReviewService.getReviewByProductId(productId, page, limit);

	return new OK({
		message: 'Reviews fetched successfully',
		data: reviews,
	}).send(res);
};

export default { createReview, getReviews, getReviewByRating, getReviewByProductId };
