import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Payment';
const COLLECTION_NAME = 'Payments';

const paymentSchema = new Schema(
	{
		order_id: {
			type: Schema.Types.ObjectId,
			ref: 'OrderDetails',
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		provider: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Payment = model(DOCUMENT_NAME, paymentSchema);
export default Payment;
