import { Types } from 'mongoose';

export interface IReview {
	userId: Types.ObjectId;
	productId: Types.ObjectId;
	rating: number;
	comment: string;
}

export interface ICreateReview {
	userId: Types.ObjectId;
	productId: Types.ObjectId;
	rating: number;
	comment: string;
}

export interface IGetReviews {
	productId?: Types.ObjectId;
	userId?: Types.ObjectId;
	rating?: number;
}
