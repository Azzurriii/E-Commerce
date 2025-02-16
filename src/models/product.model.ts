import mongoose, { model, Schema } from 'mongoose';
import validator from 'validator';
import { IProduct } from '@interfaces/product';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const ProductsSchema = new Schema<IProduct>(
	{
		sku: {
			type: String,
			required: false,
		},
		img: {
			type: String,
			required: true,
			validate: [validator.isURL, 'Please provide valid url(s)'],
		},
		title: {
			type: String,
			required: [true, 'Please provide a name for this product.'],
			trim: true,
			minLength: [3, 'Name must be at least 3 characters.'],
			maxLength: [200, 'Name is too large'],
		},
		slug: {
			type: String,
			trim: true,
			required: false,
		},
		unit: {
			type: String,
			required: true,
		},
		imageURLs: [
			{
				color: {
					name: {
						type: String,
						required: false,
						trim: true,
					},
					clrCode: {
						type: String,
						required: false,
						trim: true,
					},
				},
				img: {
					type: String,
					required: false,
					validate: [validator.isURL, 'Please provide valid url(s)'],
				},
				sizes: [String],
			},
		],
		parent: {
			type: String,
			required: true,
			trim: true,
		},
		children: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: [0, "Product price can't be negative"],
		},
		discount: {
			type: Number,
			min: [0, "Product price can't be negative"],
		},
		quantity: {
			type: Number,
			required: true,
			min: [0, "Product quantity can't be negative"],
		},
		brand: {
			name: {
				type: String,
				required: true,
			},
			id: {
				type: Schema.Types.ObjectId,
				ref: 'Brand',
				required: true,
			},
		},
		category: {
			name: {
				type: String,
				required: true,
			},
			id: {
				type: Schema.Types.ObjectId,
				ref: 'Category',
				required: true,
			},
		},
		status: {
			type: String,
			required: true,
			enum: {
				values: ['in-stock', 'out-of-stock', 'discontinued'],
				message: "status can't be {VALUE} ",
			},
			default: 'in-stock',
		},
		reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
		productType: {
			type: String,
			required: true,
			lowercase: true,
		},
		description: {
			type: String,
			required: true,
		},
		videoId: {
			type: String,
			required: false,
		},
		additionalInformation: [{}],
		tags: [String],
		sizes: [String],
		offerDate: {
			startDate: {
				type: Date,
			},
			endDate: {
				type: Date,
			},
		},
		featured: {
			type: Boolean,
			default: false,
		},
		sellCount: {
			type: Number,
			default: 0,
			min: 0,
		},
	},
	{
		timestamps: true,
	},
);

const Product = model<IProduct>(DOCUMENT_NAME, ProductsSchema, COLLECTION_NAME);

export default Product;
