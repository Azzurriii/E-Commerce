import { Schema, model } from 'mongoose';
import { IReview } from '@interfaces/review';
const DOCUMENT_NAME = 'Review';
const COLLECTION_NAME = 'Reviews';

const reviewSchema = new Schema<IReview>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		productId: {
			type: Schema.Types.ObjectId,
			ref: 'Products',
			required: true,
		},
		rating: { type: Number, required: true, min: 1, max: 5 },
		comment: { type: String },
	},
	{
		timestamps: true,
	},
);

const Review = model(DOCUMENT_NAME, reviewSchema, COLLECTION_NAME);
export default Review;
