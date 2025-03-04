import express from 'express';
import CartController from '@controllers/cart.controller';
import { asyncHandler } from '@middlewares/error.middleware';

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Cart management APIs
 */
const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get cart by user_id
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: List of all carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product_id:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                         product:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             price:
 *                               type: number
 *                             image:
 *                               type: string
 *                             desc:
 *                               type: string
 *                             SKU:
 *                               type: string
 *                             category_id:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 desc:
 *                                   type: string
 *                                 createdAt:
 *                                   type: string
 *                                 updatedAt:
 *                                   type: string
 *                             inventory_id:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 desc:
 *                                   type: string
 *                                 createdAt:
 *                                   type: string
 *                                 updatedAt:
 *                                   type: string
 *                             discount_id:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 desc:
 *                                   type: string
 *                                 createdAt:
 *                                   type: string
 *                                 updatedAt:
 *                                   type: string
 */
router.get('/', asyncHandler(CartController.getCart));

// Add a product to cart
/**
 * @swagger
 * /carts/:
 *   post:
 *     summary: Add to cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(CartController.addProductToCart));

// Delete a product from cart
/**
 * @swagger
 * /carts/{productId}:
 *   delete:
 *     summary: Delete a product from cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Product deleted from cart successfully
 *       404:
 *         description: Product not found in cart
 */
router.delete('/:productId', asyncHandler(CartController.deleteProductFromCart));

// Update cart
/**
 * @swagger
 * /carts/{productId}:
 *   put:
 *     summary: Update a product in cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: productId
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product updated in cart successfully
 *       404:
 *         description: Product not found in cart
 */
router.put('/:productId', asyncHandler(CartController.updateProductInCart));

export default (): express.Router => {
	return router;
};
