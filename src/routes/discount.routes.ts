import express from 'express';
import DiscountController from '@controllers/discount.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount management APIs
 */
const router = express.Router({ mergeParams: true });

// GET Method doesn't need authentication and permission
// Get categories
/**
 * @swagger
 * /discounts:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: List of all discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   discount_percent:
 *                     type: number
 *                   active:
 *                     type: boolean
 */
router.get('/', asyncHandler(DiscountController.getDiscounts));

// Get discount by product id
/**
 * @swagger
 * /discounts/product/{productId}:
 *   get:
 *     summary: Get discount by product id
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Discount details
 *       404:
 *         description: Discount not found
 */
router.get('/product/:productId', asyncHandler(DiscountController.getDiscountByProductId));

// Get a single discount by ID
/**
 * @swagger
 * /discounts/{id}:
 *   get:
 *     summary: Get a single discount by ID
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Discount details
 *       404:
 *         description: Discount not found
 */
router.get('/:id', asyncHandler(DiscountController.getDiscount));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a new discount
/**
 * @swagger
 * /discounts/:
 *   post:
 *     summary: Add a new discount
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               desc:
 *                 type: string
 *                 example: "Electronic devices category"
 *               discount_percent:
 *                 type: number
 *                 example: 10
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Discount created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(DiscountController.addDiscount));

// Delete a discount
/**
 * @swagger
 * /discounts/{id}:
 *   delete:
 *     summary: Delete a discount by ID
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *       404:
 *         description: Discount not found
 */
router.delete('/:id', asyncHandler(DiscountController.deleteDiscount));

// Update a discount
/**
 * @swagger
 * /discounts/{id}:
 *   put:
 *     summary: Update a discount by ID
 *     tags: [Discounts]
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
 *               name:
 *                 type: string
 *                 example: Updated Electronics
 *               desc:
 *                 type: string
 *                 example: Updated description for discount
 *               discount_percent:
 *                 type: number
 *                 example: 10
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *       404:
 *         description: Discount not found
 */
router.put('/:id', asyncHandler(DiscountController.updateDiscount));

export default (): express.Router => {
	return router;
};
