import express from 'express';
import UserAddressController from '@controllers/user-address.controller';
import { asyncHandler } from '@middlewares/error.middleware';
// import MiddlewareAuthorization from '@middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: User Address
 *   description: User address management APIs
 */
const router = express.Router({ mergeParams: true });

// GET Method doesn't need authentication and permission
// Get categories
/**
 * @swagger
 * /user-addresses:
 *   get:
 *     summary: Get all user addresses
 *     tags: [User Address]
 *     responses:
 *       200:
 *         description: List of all user addresses
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
 *                   address_line1:
 *                     type: string
 *                   address_line2:
 *                     type: string
 *                   city:
 *                     type: string
 *                   postal_code:
 *                     type: string
 *                   country:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                   mobile:
 *                     type: string
 */
router.get('/', asyncHandler(UserAddressController.getUserAddresses));

// Get a single user address by ID
/**
 * @swagger
 * /user-addresses/{id}:
 *   get:
 *     summary: Get a single user address by ID
 *     tags: [User Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: User address details
 *       404:
 *         description: User address not found
 */
router.get('/:id', asyncHandler(UserAddressController.getUserAddress));

// Get user address by user ID
/**
 * @swagger
 * /user-addresses/user/{userId}:
 *   get:
 *     summary: Get user address by user ID
 *     tags: [User Address]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: User address details
 *       404:
 *         description: User address not found
 */
router.get('/user/:userId', asyncHandler(UserAddressController.getUserAddressByUserId));
// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
// router.use(MiddlewareAuthorization.checkAuthentication);
// router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a new user address
/**
 * @swagger
 * /user-addresses/:
 *   post:
 *     summary: Add a new user address
 *     tags: [User Address]
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
 *               address_line1:
 *                 type: string
 *                 example: "123 Main St"
 *               address_line2:
 *                 type: string
 *                 example: "Apt 1"
 *               city:
 *                 type: string
 *                 example: "Anytown"
 *               postal_code:
 *                 type: string
 *                 example: "12345"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               telephone:
 *                 type: string
 *                 example: "1234567890"
 *               mobile:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: User address created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(UserAddressController.addUserAddress));

// Delete a user address
/**
 * @swagger
 * /user-addresses/{id}:
 *   delete:
 *     summary: Delete a user address by ID
 *     tags: [User Address]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: User address deleted successfully
 *       404:
 *         description: User address not found
 */
router.delete('/:id', asyncHandler(UserAddressController.deleteUserAddress));

// Update a user address
/**
 * @swagger
 * /user-addresses/{id}:
 *   put:
 *     summary: Update a user address by ID
 *     tags: [User Address]
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
 *               user_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               address_line1:
 *                 type: string
 *                 example: "123 Main St"
 *               address_line2:
 *                 type: string
 *                 example: "Apt 1"
 *               city:
 *                 type: string
 *                 example: "Anytown"
 *               postal_code:
 *                 type: string
 *                 example: "12345"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               telephone:
 *                 type: string
 *                 example: "1234567890"
 *               mobile:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: User address updated successfully
 *       404:
 *         description: User address not found
 */
router.put('/:id', asyncHandler(UserAddressController.updateUserAddress));

export default (): express.Router => {
	return router;
};
