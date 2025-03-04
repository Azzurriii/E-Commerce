import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
		},
		SKU: {
			type: String,
		},
		category_id: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		inventory_id: {
			type: Schema.Types.ObjectId,
			ref: 'Inventory',
			required: true,
		},
		price: {
			type: Schema.Types.Decimal128,
			required: true,
		},
		discount_id: {
			type: Schema.Types.ObjectId,
			ref: 'Discount',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Product = model(DOCUMENT_NAME, productSchema);
export default Product;
