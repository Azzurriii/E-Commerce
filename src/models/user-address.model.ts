import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'UserAddress';
const COLLECTION_NAME = 'UserAddresses';

const userAddressSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		address_line1: {
			type: String,
			required: true,
		},
		address_line2: {
			type: String,
		},
		city: {
			type: String,
			required: true,
		},
		postal_code: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		telephone: {
			type: String,
		},
		mobile: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const UserAddress = model(DOCUMENT_NAME, userAddressSchema);
export default UserAddress;
