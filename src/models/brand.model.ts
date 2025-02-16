import { Schema, model, Types, SchemaDefinitionProperty } from 'mongoose';
import validator from 'validator';
import { IBrand } from '@interfaces/brand';

const DOCUMENT_NAME = 'Brand';
const COLLECTION_NAME = 'Brands';

const brandSchema = new Schema<IBrand>(
	{
		logo: {
			type: String,
			required: false,
			validate: {
				validator: (value: string) => validator.isURL(value),
				message: 'Please provide valid url(s)',
			},
		} as SchemaDefinitionProperty<string | undefined>,
		name: {
			type: String,
			trim: true,
			required: [true, 'Please provide a brand name'],
			maxLength: 100,
		},
		description: {
			type: String,
		},
		email: {
			type: String,
			lowercase: true,
			validate: {
				validator: (value: string) => validator.isEmail(value),
				message: 'Please provide a valid email',
			},
		} as SchemaDefinitionProperty<string | undefined>,
		website: {
			type: String,
			validate: {
				validator: validator.isURL,
				message: 'Please provide a valid url',
			},
		},
		location: {
			type: String,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
		products: [
			{
				type: Types.ObjectId,
				ref: 'Products',
			},
		],
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Brand = model<IBrand>(DOCUMENT_NAME, brandSchema);

export default Brand;
