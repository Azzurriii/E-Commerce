import express from 'express';
import { asyncHandler } from '@middlewares/error.middleware';
import CouponController from '@controllers/coupon.controller';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

const router = express.Router({ mergeParams: true });
/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon management APIs
 */
// GET Method doesn't need authentication and permission
// Get all coupons
/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Retrieve all coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: A list of coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   couponCode:
 *                     type: string
 *                   discountPercentage:
 *                     type: number
 */
router.get('/', asyncHandler(CouponController.getCoupons));

// Get a coupon by ID
/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Retrieve a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Coupon details
 *       404:
 *         description: Coupon not found
 */
router.get('/:id', asyncHandler(CouponController.getCoupon));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a single coupon
/**
 * @swagger
 * /coupons/:
 *   post:
 *     summary: Add a new coupon
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Holiday Sale
 *               logo:
 *                 type: string
 *                 example: https://example.com/logo.png
 *               couponCode:
 *                 type: string
 *                 example: HOLIDAY2023
 *               discountPercentage:
 *                 type: number
 *                 example: 20
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-12-31T23:59:59Z
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-12-31T23:59:59Z
 *               minimumAmount:
 *                 type: number
 *                 example: 100
 *               productType:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Coupon added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', asyncHandler(CouponController.addCoupon));

// Add multiple coupons
/**
 * @swagger
 * /coupons/multiple:
 *   post:
 *     summary: Add multiple coupons
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 couponCode:
 *                   type: string
 *                 discountPercentage:
 *                   type: number
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                 minimumAmount:
 *                   type: number
 *                 productType:
 *                   type: string
 *           example:
 *             - title: "Black Friday Sale"
 *               logo: "https://example.com/logo.png"
 *               couponCode: "BLACKFRIDAY2023"
 *               discountPercentage: 30
 *               startTime: "2023-11-20T00:00:00Z"
 *               endTime: "2023-11-30T23:59:59Z"
 *               minimumAmount: 100
 *               productType: "Electronics"
 *             - title: "Christmas Special"
 *               logo: "https://example.com/logo.png"
 *               couponCode: "XMAS2023"
 *               discountPercentage: 25
 *               startTime: "2023-12-20T00:00:00Z"
 *               endTime: "2023-12-25T23:59:59Z"
 *               minimumAmount: 150
 *               productType: "Fashion"
 *     responses:
 *       201:
 *         description: Coupons added successfully
 *       400:
 *         description: Invalid input - Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/multiple', asyncHandler(CouponController.addCoupons));

// Update a coupon by ID
/**
 * @swagger
 * /coupons/{id}:
 *   patch:
 *     summary: Update a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 63fc42e6d2f1f48b606f6baf
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Coupon Title
 *               couponCode:
 *                 type: string
 *                 example: UPDATEDCODE
 *               discountPercentage:
 *                 type: number
 *                 example: 25
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-12-31T23:59:59Z
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       404:
 *         description: Coupon not found
 */
router.patch('/:id', asyncHandler(CouponController.updateCoupon));

// Delete a coupon by ID
/**
 * @swagger
 * /coupon/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *       404:
 *         description: Coupon not found
 */
router.delete('/:id', asyncHandler(CouponController.deleteCoupon));

export default (): express.Router => {
	return router;
};
