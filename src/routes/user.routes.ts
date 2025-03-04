import express from 'express';
import { asyncHandler } from '@middlewares/error.middleware';
import UserController from '@controllers/user.controller';
import AccessController from '@controllers/access.controller';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

const router = express.Router({ mergeParams: true });
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs for user authentication and account management
 */

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: User logout
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/logout', asyncHandler(AccessController.logout));

/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     summary: Refresh user token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/refresh-token', asyncHandler(AccessController.handleRefreshToken));

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@gmail.com"
 *     responses:
 *       200:
 *         description: Forgot password successful
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/forgot-password', asyncHandler(UserController.forgotPassword));

/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               token:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: Reset password successful
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/reset-password', asyncHandler(UserController.resetPassword));

/**
 * @swagger
 * /user/change-password:
 *   post:
 *     summary: Change password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@gmail.com"
 *               oldPassword:
 *                 type: string
 *                 example: "password123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Change password successful
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/change-password', asyncHandler(UserController.changePassword));

export default (): express.Router => {
	return router;
};
