import express from 'express';
import { asyncHandler } from '@middlewares/error.middleware';
import CheckoutController from '@controllers/checkout.controller';
import MiddlewareAuthorization from '@middlewares/auth.middleware';
const router = express.Router();

// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: Checkout and payment processing endpoints
 */

/**
 * @swagger
 * /checkout/create-session:
 *   post:
 *     summary: Create a checkout session
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 66c763d4f5b2c72e26a30c8b
 *               payment_method_id:
 *                 type: string
 *                 example: pm_1234567890
 *               shipping_address_id:
 *                 type: string
 *                 example: 66c763d4f5b2c72e26a30c8b
 *     responses:
 *       201:
 *         description: Checkout session created successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.post('/create-session', asyncHandler(CheckoutController.createCheckoutSession));

/**
 * @swagger
 * /checkout/confirm-payment:
 *   post:
 *     summary: Confirm payment and create order
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_intent_id:
 *                 type: string
 *                 example: pi_1234567890
 *               shipping_address_id:
 *                 type: string
 *                 example: 66c763d4f5b2c72e26a30c8b
 *     responses:
 *       200:
 *         description: Payment confirmed and order created successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.post('/confirm-payment', asyncHandler(CheckoutController.confirmPayment));

/**
 * @swagger
 * /checkout/webhook:
 *   post:
 *     summary: Handle Stripe webhook events
 *     tags: [Checkout]
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid webhook signature
 */
router.post('/webhook', express.raw({ type: 'application/json' }), CheckoutController.handleStripeWebhook);

export default (): express.Router => {
	return router;
};
