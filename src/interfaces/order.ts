import { Types } from 'mongoose';

export type OrderStatus = 'pending' | 'processing' | 'delivered' | 'cancel';
export const OrderStatus = {
	pending: 'pending',
	processing: 'processing',
	delivered: 'delivered',
	cancel: 'cancel',
};

export interface IOrder {
	user: Types.ObjectId; // Reference to the User model
	cart: any[]; // Consider defining a specific type for the cart items
	name: string;
	address: string;
	email: string;
	contact: string;
	city: string;
	country: string;
	zipCode: string;
	subTotal: number;
	shippingCost: number;
	discount: number;
	totalAmount: number;
	shippingOption?: string;
	cardInfo?: any; // Consider defining a specific type for card info
	paymentIntent?: any; // Consider defining a specific type for payment intent
	paymentMethod: string;
	orderNote?: string;
	invoice?: number;
	status?: OrderStatus;
	createdAt?: Date;
	updatedAt?: Date;
}
