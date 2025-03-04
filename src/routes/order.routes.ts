import express from 'express';
import OrderController from '@controllers/order.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */
const router = express.Router({ mergeParams: true });

// GET Method doesn't need authentication and permission
// Get orders
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                   total:
 *                     type: number
 *                   payment_id:
 *                     type: string
 */
router.get('/', asyncHandler(OrderController.getOrdersDetails));

// Get a single order by ID
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get('/:id', asyncHandler(OrderController.getOrderDetails));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a new order
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               total:
 *                 type: number
 *                 example: 100
 *               payment_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(OrderController.addOrderDetails));

// Delete a order
/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete a order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:id', asyncHandler(OrderController.deleteOrderDetails));

// Update a order
/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update a order by ID
 *     tags: [Orders]
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
 *               total:
 *                 type: number
 *                 example: 100
 *               payment_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put('/:id', asyncHandler(OrderController.updateOrderDetails));

export default (): express.Router => {
	return router;
};
