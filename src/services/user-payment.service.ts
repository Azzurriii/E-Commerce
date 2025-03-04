import UserPayment from '@models/user-payment.model';
import { ICreateUserPayment, IUpdateUserPayment } from '@interfaces/user-payment';
import { NotFoundError, BadRequestError } from '@handlers/response-handler';
import Stripe from 'stripe';
import stripe from '@configs/stripe';

// Create new payment method
const addUserPayment = async (data: ICreateUserPayment) => {
	// If this is the default method, update all other methods to be non-default
	if (data.is_default) {
		await UserPayment.updateMany({ user_id: data.user_id }, { is_default: false });
	}

	// Create payment method record
	const userPayment = await UserPayment.create(data);
	return userPayment;
};

// Get all payment methods
const getUserPayments = async () => {
	const userPayments = await UserPayment.find({});
	return userPayments;
};

// Get payment method by user ID
const getUserPaymentByUserId = async (userId: string) => {
	const userPayments = await UserPayment.find({ user_id: userId });
	return userPayments;
};

// Delete payment method
const deleteUserPayment = async (id: string) => {
	const payment = await getUserPayment(id);

	try {
		// Delete payment method from Stripe
		if (payment.stripe_payment_method_id) {
			await stripe.paymentMethods.detach(payment.stripe_payment_method_id);
		}

		// Delete from database
		const result = await UserPayment.findByIdAndDelete(id);
		if (!result) {
			throw new NotFoundError('User payment not found!');
		}
		return result;
	} catch (error) {
		if (error instanceof Stripe.errors.StripeError) {
			throw new BadRequestError(`Stripe error: ${error.message}`);
		}
		throw error;
	}
};

// Update payment method
const updateUserPayment = async (id: string, payload: IUpdateUserPayment) => {
	const payment = await getUserPayment(id);

	// If updating to default method
	if (payload.is_default) {
		await UserPayment.updateMany({ user_id: payment.user_id, _id: { $ne: id } }, { is_default: false });
	}

	const result = await UserPayment.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// Get a payment method
const getUserPayment = async (id: string) => {
	const result = await UserPayment.findById(id);
	if (!result) {
		throw new NotFoundError('User payment not found!');
	}
	return result;
};

// Set default payment method
const setDefaultPaymentMethod = async (id: string, userId: string) => {
	// Check if payment method exists
	const payment = await getUserPayment(id);

	// Check if payment method belongs to user
	if (payment.user_id.toString() !== userId) {
		throw new BadRequestError('Payment method does not belong to this user');
	}

	// Update all user's payment methods to be non-default
	await UserPayment.updateMany({ user_id: userId }, { is_default: false });

	// Set current payment method as default
	const result = await UserPayment.findByIdAndUpdate(id, { is_default: true }, { new: true });

	return result;
};

export default {
	addUserPayment,
	getUserPayments,
	deleteUserPayment,
	updateUserPayment,
	getUserPayment,
	getUserPaymentByUserId,
	setDefaultPaymentMethod,
};
