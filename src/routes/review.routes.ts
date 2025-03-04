import express from 'express';
import { asyncHandler } from '@middlewares/error.middleware';
import ReviewController from '@controllers/review.controller';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management endpoints
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of all reviews
 */
router.get('/', asyncHandler(ReviewController.getReviews));

/**
 * @swagger
 * /reviews/{productId}:
 *   get:
 *     summary: Get a review by Product ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 */
router.get('/:productId', asyncHandler(ReviewController.getReviewByProductId));

/**
 * @swagger
 * /reviews/rating/{rating}:
 *   get:
 *     summary: Get reviews by rating
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: rating
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of reviews by rating
 */
router.get('/rating/:rating', asyncHandler(ReviewController.getReviewByRating));

// Middleware to check if the user is authenticated
router.use(MiddlewareAuthorization.checkAuthentication);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.post('/', asyncHandler(ReviewController.createReview));

export default (): express.Router => {
	return router;
};
