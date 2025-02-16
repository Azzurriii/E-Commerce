import { model, Schema } from 'mongoose';
import UserConstants from '@interfaces/user';
import validator from 'validator';

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 200,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please enter a valid email'],
		},
		password: {
			type: String,
			required: true,
			minLength: [6, 'Must be at least 6 character'],
		},
		status: {
			type: String,
			enum: Object.values(UserConstants.UserStatus),
			default: UserConstants.UserStatus.INACTIVE,
			required: true,
		},
		verified: {
			type: Schema.Types.Boolean,
			default: false,
			required: true,
		},
		roles: {
			type: Array,
			default: [],
		},
	},
	{
		collection: COLLECTION_NAME,
		timestamps: true,
	},
);

const User = model(DOCUMENT_NAME, UserSchema);
export default User;
