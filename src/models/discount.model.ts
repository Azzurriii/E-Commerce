import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Discount';
const COLLECTION_NAME = 'Discounts';

const discountSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
		},
		discount_percent: {
			type: Schema.Types.Decimal128,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Discount = model(DOCUMENT_NAME, discountSchema);
export default Discount;
