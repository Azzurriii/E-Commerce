import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';

const OrderSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		total: {
			type: Schema.Types.Decimal128,
			required: true,
		},
		payment_id: {
			type: Schema.Types.ObjectId,
			ref: 'PaymentDetails',
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Order = model(DOCUMENT_NAME, OrderSchema);
export default Order;
