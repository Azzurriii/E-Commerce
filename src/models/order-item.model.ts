import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'OrderItems';
const COLLECTION_NAME = 'OrderItems';

const orderItemsSchema = new Schema(
	{
		order_id: {
			type: Schema.Types.ObjectId,
			ref: 'Order',
			required: true,
		},
		product_id: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const OrderItems = model(DOCUMENT_NAME, orderItemsSchema);
export default OrderItems;
