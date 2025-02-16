import express from 'express';
import ReviewController from '@controllers/review.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import AuthMiddleware from '@middlewares/auth.middleware';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: APIs for managing product reviews
 */

// GET Method doesn't need authentication and permission
// Get all reviews
/**
 * @swagger
 * /reviews/:
 *   get:
 *     summary: Get a reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: rating
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of reviews
 */
router.get('/', asyncHandler(ReviewController.getReviews));

// Middleware
router.use(asyncHandler(AuthMiddleware.checkAuthentication));
router.use(asyncHandler(AuthMiddleware.checkPermission('0000')));

// Add a review
/**
 * @swagger
 * /reviews/:
 *   post:
 *     summary: Add a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - rating
 *               - comment
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 63fc42e6d2f1f48b606f6baf
 *               productId:
 *                 type: string
 *                 example: 63fc42e6d2f1f48b606f6bbf
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: Great product!
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Review already exists or user has not purchased the product
 *       500:
 *         description: Server error
 */
router.post('/', asyncHandler(ReviewController.addReview));

// Update a review
/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Update a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 641e887d05f9ee1717e134cb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comment:
 *                 type: string
 *                 example: Updated review
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', asyncHandler(ReviewController.updateReview));

// Delete reviews by product ID
/**
 * @swagger
 * /reviews/{productId}:
 *   delete:
 *     summary: Delete all reviews for a specific product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6bbf
 *     responses:
 *       200:
 *         description: All reviews deleted successfully
 *       404:
 *         description: No reviews found for the product
 *       500:
 *         description: Server error
 */
router.delete('/:productId', asyncHandler(ReviewController.deleteReviews));

export default (): express.Router => {
	return router;
};
