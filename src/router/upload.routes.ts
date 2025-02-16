import express from 'express';
import uploader from '../middlewares/upload.middleware';
import { asyncHandler } from '../middlewares/error.middleware';
import UploadController from '@controllers/upload.controller';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

const router = express.Router({ mergeParams: true });

// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: APIs for uploading and managing images
 */

/**
 * @swagger
 * /upload/single:
 *   post:
 *     summary: Upload single image
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/single', uploader.single('image'), asyncHandler(UploadController.uploadSingle));

/**
 * @swagger
 * /upload/multiple:
 *   post:
 *     summary: Upload multiple images
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/multiple', uploader.array('images', 10), asyncHandler(UploadController.uploadMultiple));

/**
 * @swagger
 * /upload:
 *   delete:
 *     summary: Delete image
 *     tags: [Upload]
 *     parameters:
 *       - in: query
 *         name: public_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Public ID of the image from Cloudinary
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.delete('/', asyncHandler(UploadController.deleteImage));

export default (): express.Router => {
	return router;
};
