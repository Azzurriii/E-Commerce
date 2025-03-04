import express from 'express';
import OrderItemController from '@controllers/order-item.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Order Items
 *   description: Order item management APIs
 */
const router = express.Router({ mergeParams: true });

// GET Method doesn't need authentication and permission
// Get order items
/**
 * @swagger
 * /order-items:
 *   get:
 *     summary: Get all order items
 *     tags: [Order Items]
 *     responses:
 *       200:
 *         description: List of all order items
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
 *                   product_id:
 *                     type: string
 *                   quantity:
 *                     type: number
 */
router.get('/', asyncHandler(OrderItemController.getOrderItems));

// Get a single order item by ID
/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Get a single order item by ID
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Order item details
 *       404:
 *         description: Order item not found
 */
router.get('/:id', asyncHandler(OrderItemController.getOrderItem));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a new order item
/**
 * @swagger
 * /order-items/:
 *   post:
 *     summary: Add a new order item
 *     tags: [Order Items]
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
 *               product_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Order item created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(OrderItemController.addOrderItem));

// Delete a order item
/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Delete a order item by ID
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 */
router.delete('/:id', asyncHandler(OrderItemController.deleteOrderItem));

// Update a order item
/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Update a order item by ID
 *     tags: [Order Items]
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
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put('/:id', asyncHandler(OrderItemController.updateOrderItem));

export default (): express.Router => {
	return router;
};
