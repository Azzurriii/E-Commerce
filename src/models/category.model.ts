import { Schema, model, Types } from 'mongoose';
import { ICategory } from '@interfaces/category';

const DOCUMENT_NAME = 'Category';
const COLLECTION_NAME = 'Categories';

const CategorySchema = new Schema<ICategory>(
	{
		img: {
			type: String,
			required: false,
		},
		parent: {
			type: String,
			required: true,
			trim: true,
		},
		children: [{ type: String }],
		productType: {
			type: String,
			trim: true,
			required: true,
			lowercase: true,
		},
		description: {
			type: String,
			required: false,
		},
		products: [
			{
				type: Types.ObjectId,
				ref: 'Products',
			},
		],
		status: {
			type: String,
			enum: ['Show', 'Hide'],
			default: 'Show',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Category = model<ICategory>(DOCUMENT_NAME, CategorySchema);

export default Category;
