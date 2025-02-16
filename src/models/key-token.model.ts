import { model, Schema } from 'mongoose';
import { IKeyToken } from '@interfaces/key-token';

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

const KeyTokenSchema = new Schema<IKeyToken>(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		publicKey: {
			type: String,
			required: true,
		},
		privateKey: {
			type: String,
			required: true,
		},
		refreshTokensUsed: {
			type: [String],
			default: [],
		},
		refreshToken: {
			type: String,
			required: true,
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	},
);

const User = model(DOCUMENT_NAME, KeyTokenSchema);
export default User;
