import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Category';
const COLLECTION_NAME = 'Categories';

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Category = model(DOCUMENT_NAME, categorySchema);
export default Category;
