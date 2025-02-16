import express from 'express';
import CategoryController from '@controllers/category.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */
const router = express.Router({ mergeParams: true });

// GET Method doesn't need authentication and permission
// Get all categories
/**
 * @swagger
 * /categories/all:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
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
 */
router.get('/all', asyncHandler(CategoryController.getCategories));

// Get product type category
/**
 * @swagger
 * /categories/show/{type}:
 *   get:
 *     summary: Get categories by product type
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           example: electronics
 *     responses:
 *       200:
 *         description: Categories for the specified type
 *       404:
 *         description: Type not found
 */
router.get('/show/:type', asyncHandler(CategoryController.getProductTypeCategory));

// Get categories with status "Show"
/**
 * @swagger
 * /categories/show:
 *   get:
 *     summary: Get categories with status "Show"
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories with status "Show"
 *       404:
 *         description: No categories found
 */
router.get('/show', asyncHandler(CategoryController.getShowCategory));

// Get a single category by ID
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Category details
 *       404:
 *         description: Category not found
 */
router.get('/:id', asyncHandler(CategoryController.getCategory));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a new category
/**
 * @swagger
 * /categories/:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               parent:
 *                 type: string
 *                 example: "Electronics"
 *               productType:
 *                 type: string
 *                 example: "electronics"
 *               children:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Laptops", "Smartphones"]
 *               description:
 *                 type: string
 *                 example: "Electronic devices category"
 *               img:
 *                 type: string
 *                 example: "https://example.com/electronics.jpg"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(CategoryController.addCategory));

// Add multiple categories
/**
 * @swagger
 * /categories/multiple:
 *   post:
 *     summary: Add multiple categories
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 parent:
 *                   type: string
 *                   example: "Electronics"
 *                 productType:
 *                   type: string
 *                   example: "electronics"
 *                 children:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Laptops", "Smartphones"]
 *                 description:
 *                   type: string
 *                   example: "Electronic devices category"
 *                 img:
 *                   type: string
 *                   example: "https://example.com/electronics.jpg"
 *                 status:
 *                   type: string
 *                   enum: ["Show", "Hide"]
 *                   example: "Show"
 *           example:
 *             - parent: "Electronics"
 *               productType: "electronics"
 *               children: ["Laptops", "Smartphones", "Accessories"]
 *               description: "Electronic devices and gadgets"
 *               img: "https://example.com/electronics.jpg"
 *               status: "Show"
 *             - parent: "Fashion"
 *               productType: "clothing"
 *               children: ["Men's Wear", "Women's Wear", "Kids"]
 *               description: "Clothing and accessories"
 *               img: "https://example.com/fashion.jpg"
 *               status: "Show"
 *             - parent: "Home & Living"
 *               productType: "furniture"
 *               children: ["Living Room", "Bedroom", "Kitchen"]
 *               description: "Furniture and home decor"
 *               img: "https://example.com/furniture.jpg"
 *               status: "Show"
 *     responses:
 *       201:
 *         description: Categories added successfully
 *       400:
 *         description: Invalid data - Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/multiple', asyncHandler(CategoryController.addCategories));

// Delete a category
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', asyncHandler(CategoryController.deleteCategory));

// Update a category
/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Categories]
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
 *               description:
 *                 type: string
 *                 example: Updated description for category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.patch('/:id', asyncHandler(CategoryController.updateCategory));

export default (): express.Router => {
	return router;
};
