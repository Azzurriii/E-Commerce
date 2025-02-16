import { Schema, model, Document, CallbackError } from 'mongoose';
import { IOrder, OrderStatus } from '@interfaces/order';
const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';

const orderSchema = new Schema<IOrder>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		cart: [{}], // Ideally, define a specific type for cart items
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		zipCode: {
			type: String,
			required: true,
		},
		subTotal: {
			type: Number,
			required: true,
		},
		shippingCost: {
			type: Number,
			required: true,
		},
		discount: {
			type: Number,
			required: true,
			default: 0,
		},
		totalAmount: {
			type: Number,
			required: true,
		},
		shippingOption: {
			type: String,
			required: false,
		},
		cardInfo: {
			type: Object,
			required: false,
		},
		paymentIntent: {
			type: Object,
			required: false,
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		orderNote: {
			type: String,
			required: false,
		},
		invoice: {
			type: Number,
			unique: true,
		},
		status: {
			type: String,
			enum: Object.values(OrderStatus),
			lowercase: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

// define pre-save middleware to generate the invoice number
orderSchema.pre('save', async function (next) {
	const order = this as IOrder & Document; // Explicitly type 'this'

	if (!order.invoice) {
		try {
			// find the highest invoice number in the orders collection
			const highestInvoice = await model<IOrder>('Order') // Explicitly type the model
				.find({})
				.sort({ invoice: 'desc' })
				.limit(1)
				.select({ invoice: 1 })
				.exec();

			const startingInvoice = highestInvoice.length === 0 ? 1000 : (highestInvoice[0].invoice || 1000) + 1;

			order.invoice = startingInvoice;
			next();
		} catch (error) {
			next(error as CallbackError);
		}
	} else {
		next();
	}
});

const Order = model<IOrder>(DOCUMENT_NAME, orderSchema);

export default Order;
