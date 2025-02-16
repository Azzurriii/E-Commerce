import express from 'express';
import { asyncHandler } from '@middlewares/error.middleware';
import BrandController from '@controllers/brand.controller';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

const router = express.Router({ mergeParams: true });
/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: APIs for brand management
 */

// GET Method doesn't need authentication and permission
/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: A list of brands
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.get('/', asyncHandler(BrandController.getBrands));

/**
 * @swagger
 * /brands/active:
 *   get:
 *     summary: Get all active brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: A list of active brands
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.get('/active', asyncHandler(BrandController.getActiveBrands));

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A brand
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', asyncHandler(BrandController.getBrandById));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Add a brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Brand Name"
 *               description:
 *                 type: string
 *                 example: "Brand Description"
 *               logo:
 *                 type: string
 *                 example: "https://res.cloudinary.com/..."
 *               email:
 *                 type: string
 *                 example: "brand@gmail.com"
 *               website:
 *                 type: string
 *                 example: "https://www.brand.com"
 *               location:
 *                 type: string
 *                 example: "Brand Location"
 *               status:
 *                 type: string
 *                 example: "active"
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "641e887d05f9ee1717e1348a"
 *     responses:
 *       200:
 *         description: A brand
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/', asyncHandler(BrandController.addBrand));

/**
 * @swagger
 * /brands/multiple:
 *   post:
 *     summary: Add multiple brands
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 email:
 *                   type: string
 *                 website:
 *                   type: string
 *                 location:
 *                   type: string
 *                 status:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: string
 *           example:
 *             - name: "Nike"
 *               description: "American sportswear company"
 *               logo: "https://res.cloudinary.com/demo/image/upload/nike-logo.png"
 *               email: "contact@nike.com"
 *               website: "https://www.nike.com"
 *               location: "Oregon, United States"
 *               status: "active"
 *               products: ["641e887d05f9ee1717e1348a", "641e887d05f9ee1717e1348b"]
 *             - name: "Adidas"
 *               description: "German sportswear company"
 *               logo: "https://res.cloudinary.com/demo/image/upload/adidas-logo.png"
 *               email: "contact@adidas.com"
 *               website: "https://www.adidas.com"
 *               location: "Herzogenaurach, Germany"
 *               status: "active"
 *               products: ["641e887d05f9ee1717e1348c", "641e887d05f9ee1717e1348d"]
 *     responses:
 *       200:
 *         description: A list of brands
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post('/multiple', asyncHandler(BrandController.addBrands));

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Update a brand
 *     tags: [Brands]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Brand Name"
 *               description:
 *                 type: string
 *                 example: "New Brand Description"
 *               logo:
 *                 type: string
 *                 example: "https://res.cloudinary.com/..."
 *               email:
 *                 type: string
 *                 example: "newbrand@gmail.com"
 *               website:
 *                 type: string
 *                 example: "https://www.newbrand.com"
 *               location:
 *                 type: string
 *                 example: "New Brand Location"
 *               status:
 *                 type: string
 *                 example: "active"
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "641e887d05f9ee1717e1348a"
 *     responses:
 *       200:
 *         description: A brand
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.patch('/:id', asyncHandler(BrandController.updateBrand));

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A brand
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', asyncHandler(BrandController.deleteBrand));

export default (): express.Router => {
	return router;
};
1;
