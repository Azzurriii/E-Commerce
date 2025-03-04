import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Review';
const COLLECTION_NAME = 'Reviews';

const ReviewSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		product_id: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		comment: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Review = model(DOCUMENT_NAME, ReviewSchema);
export default Review;
