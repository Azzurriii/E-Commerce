import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'UserPayment';
const COLLECTION_NAME = 'UserPayments';

const userPaymentSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		payment_type: {
			type: String,
			required: true,
			enum: ['card', 'bank_account', 'wallet'],
		},
		provider: {
			type: String,
			required: true,
		},
		account_no: {
			type: String,
			// Chỉ lưu 4 số cuối của thẻ
		},
		expiry: {
			type: Date,
		},
		stripe_payment_method_id: {
			type: String,
			required: true,
			unique: true,
		},
		is_default: {
			type: Boolean,
			default: false,
		},
		card_brand: {
			type: String,
		},
		card_holder_name: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const UserPayment = model(DOCUMENT_NAME, userPaymentSchema);
export default UserPayment;
