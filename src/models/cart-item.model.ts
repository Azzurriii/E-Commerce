import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'CartItem';
const COLLECTION_NAME = 'CartItems';

const cartItemSchema = new Schema(
	{
		cart_id: {
			type: Schema.Types.ObjectId,
			ref: 'Cart',
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
			default: 1,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const CartItem = model(DOCUMENT_NAME, cartItemSchema);
export default CartItem;
