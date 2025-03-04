import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'Carts';

const cartSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Cart = model(DOCUMENT_NAME, cartSchema);
export default Cart;
