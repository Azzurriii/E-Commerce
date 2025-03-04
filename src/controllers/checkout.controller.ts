import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
import CheckoutService from '@services/checkout.service';
import Stripe from 'stripe';
import stripe from '@configs/stripe';

/**
 * Create Checkout Session
 */
const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
	const result = await CheckoutService.createCheckoutSession(req.body);

	return new CREATED({
		message: 'Checkout session created successfully',
		data: result,
	}).send(res);
};

/**
 * Confirm payment and create order
 */
const confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
	const result = await CheckoutService.confirmPayment(req.body);

	return new OK({
		message: 'Payment confirmed and order created successfully',
		data: result,
	}).send(res);
};

/**
 * Handle Stripe webhook
 */
const handleStripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
	const sig = req.headers['stripe-signature'] as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
	} catch (err: any) {
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	const result = await CheckoutService.handleStripeWebhook(event);

	return res.json(result);
};

export default {
	createCheckoutSession,
	confirmPayment,
	handleStripeWebhook,
};
