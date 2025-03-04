import express from 'express';
import { asyncHandler } from '@middlewares/error.middleware';
import UserPaymentController from '@controllers/user-payment.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Payments
 *   description: User Payment management endpoints
 */

/**
 * @swagger
 * /user-payments:
 *   get:
 *     summary: Get all user-payments
 *     tags: [UserPayments]
 *     responses:
 *       200:
 *         description: List of all user-payments
 */
router.get('/', asyncHandler(UserPaymentController.getUserPayments));

/**
 * @swagger
 * /user-payments/{id}:
 *   get:
 *     summary: Get a user-payment by ID
 *     tags: [UserPayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 66c763d4f5b2c72e26a30c8b
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: UserPayment details
 *       404:
 *         description: UserPayment not found
 */
router.get('/:id', asyncHandler(UserPaymentController.getUserPayment));

/**
 * @swagger
 * /user-payments/user/{userId}:
 *   get:
 *     summary: Get user-payments by user ID
 *     tags: [UserPayments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         example: 66c763d4f5b2c72e26a30c8b
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user-payments by user ID
 *       404:
 *         description: UserPayment not found
 */
router.get('/user/:userId', asyncHandler(UserPaymentController.getUserPaymentByUserId));

/**
 * @swagger
 * /user-payments:
 *   post:
 *     summary: Create a new user-payment
 *     tags: [UserPayments]
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
 *               payment_type:
 *                 type: string
 *                 example: card
 *               provider:
 *                 type: string
 *                 example: visa
 *               account_no:
 *                 type: string
 *                 example: 4242
 *               expiry:
 *                 type: string
 *                 example: 2025-01-01
 *               stripe_payment_method_id:
 *                 type: string
 *                 example: pm_1234567890
 *               is_default:
 *                 type: boolean
 *                 example: true
 *               card_brand:
 *                 type: string
 *                 example: visa
 *               card_holder_name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: UserPayment created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/', asyncHandler(UserPaymentController.addUserPayment));

/**
 * @swagger
 * /user-payments/{id}:
 *   patch:
 *     summary: Update a user-payment
 *     tags: [UserPayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_type:
 *                 type: string
 *                 example: card
 *               provider:
 *                 type: string
 *                 example: visa
 *               is_default:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: UserPayment updated successfully
 *       404:
 *         description: UserPayment not found
 */
router.patch('/:id', asyncHandler(UserPaymentController.updateUserPayment));

/**
 * @swagger
 * /user-payments/{id}:
 *   delete:
 *     summary: Delete a user-payment
 *     tags: [UserPayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 66c763d4f5b2c72e26a30c8b
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: UserPayment deleted successfully
 *       404:
 *         description: UserPayment not found
 */
router.delete('/:id', asyncHandler(UserPaymentController.deleteUserPayment));

/**
 * @swagger
 * /user-payments/{id}/set-default:
 *   post:
 *     summary: Set a payment method as default
 *     tags: [UserPayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 66c763d4f5b2c72e26a30c8b
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 66c763d4f5b2c72e26a30c8b
 *     responses:
 *       200:
 *         description: Default payment method set successfully
 *       404:
 *         description: Payment method not found
 */
router.post('/:id/set-default', asyncHandler(UserPaymentController.setDefaultPaymentMethod));

export default (): express.Router => {
	return router;
};
