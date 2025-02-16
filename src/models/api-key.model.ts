import { model, Schema } from 'mongoose';
import { IApiKey } from '@interfaces/api-key';
import ApiKeyConstants from '@constants/api-key';

const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';

const ApiKeySchema = new Schema<IApiKey>(
	{
		key: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		permissions: {
			type: [String],
			required: true,
			enum: Object.values(ApiKeyConstants.permissionType),
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const ApiKey = model(DOCUMENT_NAME, ApiKeySchema);
export default ApiKey;
