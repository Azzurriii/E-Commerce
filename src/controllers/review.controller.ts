import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
import ReviewService from '@services/review.service';
import { IGetReviews } from '@interfaces/review';
// add a review
const addReview = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Review added successfully',
		data: await ReviewService.addReview(req.body),
	}).send(res);
};

// get reviews
const getReviews = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Reviews fetched successfully',
		data: await ReviewService.getReviews(req.query as unknown as IGetReviews),
	}).send(res);
};

// update a review
const updateReview = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Review updated successfully',
		data: await ReviewService.updateReview(req.params.id, req.body),
	}).send(res);
};

// delete a review
const deleteReviews = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'All reviews deleted for the product',
		data: await ReviewService.deleteReviews(req.params.productId),
	}).send(res);
};

export default {
	addReview,
	deleteReviews,
	getReviews,
	updateReview,
};
