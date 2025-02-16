import express from 'express';
import { asyncHandler } from '@middlewares/error.middleware';
import UserOrderController from '@controllers/user.order.controller';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

const router = express.Router({ mergeParams: true });
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

/**
 * @swagger
 * tags:
 *   name: User Orders
 *   description: APIs for managing user orders
 */

// Get dashboard amount
/**
 * @swagger
 * /user-order/dashboard-amount:
 *   get:
 *     summary: Get the total amounts for orders
 *     tags: [User Orders]
 *     responses:
 *       200:
 *         description: Dashboard order amounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 todayOrderAmount:
 *                   type: number
 *                   example: 1500
 *                 yesterdayOrderAmount:
 *                   type: number
 *                   example: 1200
 *                 monthlyOrderAmount:
 *                   type: number
 *                   example: 5000
 *                 totalOrderAmount:
 *                   type: number
 *                   example: 20000
 */
router.get('/dashboard-amount', asyncHandler(UserOrderController.getDashboardAmount));

// Get sales report
/**
 * @swagger
 * /user-order/sales-report:
 *   get:
 *     summary: Retrieve the weekly sales report
 *     tags: [User Orders]
 *     responses:
 *       200:
 *         description: Weekly sales report data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "2023-12-31"
 *                   total:
 *                     type: number
 *                     example: 500
 *                   order:
 *                     type: number
 *                     example: 5
 */
router.get('/sales-report', asyncHandler(UserOrderController.getSalesReport));

// Get most selling category
/**
 * @swagger
 * /user-order/most-selling-category:
 *   get:
 *     summary: Retrieve the top 5 most selling product categories
 *     tags: [User Orders]
 *     responses:
 *       200:
 *         description: Most selling product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: Electronics
 *                   count:
 *                     type: number
 *                     example: 100
 */
router.get('/most-selling-category', asyncHandler(UserOrderController.mostSellingCategory));

// Get dashboard recent orders
/**
 * @swagger
 * /user-order/dashboard-recent-order:
 *   get:
 *     summary: Retrieve recent orders for the dashboard
 *     tags: [User Orders]
 *     responses:
 *       200:
 *         description: Recent orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       invoice:
 *                         type: string
 *                         example: INV123456
 *                       totalAmount:
 *                         type: number
 *                         example: 150
 *                       status:
 *                         type: string
 *                         example: pending
 */
router.get('/dashboard-recent-order', asyncHandler(UserOrderController.getDashboardRecentOrder));

// Get order by ID
/**
 * @swagger
 * /user-order/{id}:
 *   get:
 *     summary: Retrieve an order by ID
 *     tags: [User Orders]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 order:
 *                   type: object
 *                   properties:
 *                     invoice:
 *                       type: string
 *                       example: INV123456
 *                     totalAmount:
 *                       type: number
 *                       example: 150
 */
router.get('/:id', asyncHandler(UserOrderController.getOrderById));

// Get all orders for a user
/**
 * @swagger
 * /user-order:
 *   get:
 *     summary: Retrieve all orders for the logged-in user
 *     tags: [User Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       invoice:
 *                         type: string
 *                         example: INV123456
 *                       totalAmount:
 *                         type: number
 *                         example: 150
 *                 pending:
 *                   type: number
 *                   example: 5
 *                 processing:
 *                   type: number
 *                   example: 2
 *                 delivered:
 *                   type: number
 *                   example: 10
 */
router.get('/', asyncHandler(UserOrderController.getOrderByUser));

export default (): express.Router => {
	return router;
};
