import express from 'express';
import PaymentController from '@controllers/payment.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management APIs
 */
const router = express.Router({ mergeParams: true });

// GET Method doesn't need authentication and permission
// Get payments
/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of all payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   order_id:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   provider:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get('/', asyncHandler(PaymentController.getPayments));

// Get a single payment by ID
/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a single payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
router.get('/:id', asyncHandler(PaymentController.getPayment));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
// router.use(MiddlewareAuthorization.checkAuthentication);
// router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a new payment
/**
 * @swagger
 * /payments/:
 *   post:
 *     summary: Add a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               order_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               amount:
 *                 type: number
 *                 example: 100
 *               provider:
 *                 type: string
 *                 example: "Stripe"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(PaymentController.addPayment));

// Delete a payment
/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
router.delete('/:id', asyncHandler(PaymentController.deletePayment));

// Update a payment
/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *               provider:
 *                 type: string
 *                 example: "Stripe"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 */
router.put('/:id', asyncHandler(PaymentController.updatePayment));

export default (): express.Router => {
	return router;
};
