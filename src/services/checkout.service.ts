import Stripe from 'stripe';
import Cart from '@models/cart.model';
import CartItem from '@models/cart-item.model';
import OrderDetails from '@models/order.model';
import OrderItems from '@models/order-item.model';
import PaymentDetails from '@models/payment.model';
import Product from '@models/product.model';
import { NotFoundError, BadRequestError } from '@handlers/response-handler';
import { ICreateCheckoutSession, IConfirmPaymentRequest, IOrderCreationResult } from '@interfaces/checkout';
import mongoose from 'mongoose';
import stripe from '@configs/stripe';

/**
 * Create Checkout Session
 */
const createCheckoutSession = async (data: ICreateCheckoutSession) => {
	const { user_id, payment_method_id, shipping_address_id } = data;

	// 1. Get shopping session information
	const cart = await Cart.findOne({ user_id });
	if (!cart) {
		throw new NotFoundError('Cart not found');
	}

	// 2. Get cart items
	const cartItems = await CartItem.find({ cart_id: cart._id });
	if (cartItems.length === 0) {
		throw new BadRequestError('Cart is empty');
	}

	// 3. Get product details and calculate total price
	let total = 0;
	const lineItems = [];

	for (const item of cartItems) {
		const product = await Product.findById(item.product_id);
		if (!product) {
			throw new NotFoundError(`Product with ID ${item.product_id} not found`);
		}

		// Check product inventory
		// const inventory = await ProductInventory.findById(product.inventory_id);
		// if (!inventory || inventory.quantity < item.quantity) {
		//   throw new BadRequestError(`Not enough stock for ${product.name}`);
		// }

		total += Number(product.price) * Number(item.quantity);

		lineItems.push({
			product_id: product._id,
			name: product.name,
			price: product.price,
			quantity: item.quantity,
		});
	}

	// 4. Get or create Stripe Customerå
	let stripeCustomerId;
	const user = await mongoose.model('User').findById(user_id);

	if (!user) {
		throw new NotFoundError('User not found');
	}

	if (user.stripe_customer_id) {
		stripeCustomerId = user.stripe_customer_id;
	} else {
		// Create new customer in Stripe
		const customer = await stripe.customers.create({
			email: user.email,
			name: `${user.first_name} ${user.last_name}`,
			metadata: {
				user_id: user_id.toString(),
			},
		});

		stripeCustomerId = customer.id;

		// Update user with stripe_customer_id
		await mongoose.model('User').findByIdAndUpdate(user_id, {
			stripe_customer_id: stripeCustomerId,
		});
	}

	// 5. Create Payment Intent
	const paymentIntent = await stripe.paymentIntents.create({
		amount: Math.round(total * 100), // Stripe requires amount in cents
		currency: 'usd', // Change to your currency
		customer: stripeCustomerId,
		payment_method: payment_method_id, // If provided
		setup_future_usage: payment_method_id ? undefined : 'off_session', // Save card for future payments
		metadata: {
			user_id: user_id.toString(),
			cart_id: cart._id.toString(),
			shipping_address_id: shipping_address_id || '',
		},
	});

	//   // 6. Create Ephemeral Key for mobile app (if needed)
	//   let ephemeralKey;
	//   if (process.env.MOBILE_APP === 'true') {
	//     ephemeralKey = await stripe.ephemeralKeys.create(
	//       { customer: stripeCustomerId },
	//       { apiVersion: '2025-01-27.acacia' }
	//     );
	//   }

	// 7. Return client_secret to frontend to complete payment
	return {
		client_secret: paymentIntent.client_secret,
		payment_intent_id: paymentIntent.id,
		// ephemeral_key: ephemeralKey?.secret,
		customer_id: stripeCustomerId,
	};
};

/**
 * Confirm payment and create order
 */
const confirmPayment = async (data: IConfirmPaymentRequest) => {
	const { payment_intent_id, shipping_address_id } = data;

	// 1. Check Payment Intent status
	const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

	if (paymentIntent.status !== 'succeeded') {
		throw new BadRequestError(`Payment not successful. Status: ${paymentIntent.status}`);
	}

	// 2. Get information from metadata
	const { user_id, shopping_session_id } = paymentIntent.metadata;

	if (!user_id || !shopping_session_id) {
		throw new BadRequestError('Missing metadata in payment intent');
	}

	// 3. Get cart information
	const cart = await Cart.findById(shopping_session_id);
	if (!cart) {
		throw new NotFoundError('Cart not found');
	}

	// 4. Get cart items
	const cartItems = await CartItem.find({ cart_id: cart._id });
	if (cartItems.length === 0) {
		throw new BadRequestError('Cart is empty');
	}

	// 5. Create new order (transfer from temporary to permanent storage)
	const result = await createOrderFromCart(
		user_id,
		shopping_session_id,
		payment_intent_id,
		shipping_address_id || paymentIntent.metadata.shipping_address_id,
		paymentIntent.amount / 100, // Convert from cents to currency unit
	);

	// 6. Delete cart after creating order
	await CartItem.deleteMany({ cart_id: cart._id });
	await Cart.findByIdAndDelete(cart._id);

	return result;
};

/**
 * Create order from cart
 */
const createOrderFromCart = async (
	user_id: string,
	cart_id: string,
	payment_intent_id: string,
	shipping_address_id: string,
	total: number,
): Promise<IOrderCreationResult> => {
	// Use transaction to ensure data integrity
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// 1. Create new order
		const orderDetails = await OrderDetails.create(
			[
				{
					user_id,
					total,
					shipping_address_id,
					status: 'paid',
				},
			],
			{ session },
		);

		const order_id = orderDetails[0]._id;

		// 2. Get cart items
		const cartItems = await CartItem.find({ cart_id: cart_id });

		// 3. Create order items
		const orderItemsPromises = cartItems.map(async (item: any) => {
			const product = await Product.findById(item.product_id);

			return OrderItems.create(
				[
					{
						order_id,
						product_id: item.product_id,
						quantity: item.quantity,
					},
				],
				{ session },
			);
		});

		const orderItemsResults = await Promise.all(orderItemsPromises);

		// 4. Create payment details
		const paymentDetails = await PaymentDetails.create(
			[
				{
					order_id,
					amount: total,
					provider: 'stripe',
					status: 'completed',
					payment_intent_id,
				},
			],
			{ session },
		);

		// 5. Commit transaction
		await session.commitTransaction();

		return {
			order_id: order_id.toString(),
			order_items: orderItemsResults.flat(),
			payment_details: paymentDetails[0],
			total,
		};
	} catch (error) {
		// Rollback if error
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};

/**
 * Handle Stripe webhook
 */
const handleStripeWebhook = async (event: Stripe.Event) => {
	switch (event.type) {
		case 'payment_intent.succeeded':
			const paymentIntent = event.data.object as Stripe.PaymentIntent;
			console.log(`PaymentIntent ${paymentIntent.id} succeeded`);

			// Check if order has been created
			const existingPayment = await PaymentDetails.findOne({ payment_intent_id: paymentIntent.id });

			if (!existingPayment && paymentIntent.metadata.shopping_session_id) {
				// Automatically create order if not created
				await confirmPayment({
					payment_intent_id: paymentIntent.id,
					shipping_address_id: paymentIntent.metadata.shipping_address_id,
				});
			}
			break;

		case 'payment_intent.payment_failed':
			const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
			console.log(
				`Payment failed: ${failedPaymentIntent.id}, ${failedPaymentIntent.last_payment_error?.message}`,
			);
			break;

		default:
			console.log(`Unhandled event type ${event.type}`);
			break;
	}

	return { received: true };
};

export default {
	createCheckoutSession,
	confirmPayment,
	handleStripeWebhook,
};
