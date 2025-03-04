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
// Get categories
/**
 * @swagger
 * /categories:
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
router.get('/', asyncHandler(CategoryController.getCategories));

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
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *               desc:
 *                 type: string
 *                 example: "Electronic devices category"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(CategoryController.addCategory));

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
 *   put:
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
 *               desc:
 *                 type: string
 *                 example: Updated description for category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
router.put('/:id', asyncHandler(CategoryController.updateCategory));

export default (): express.Router => {
	return router;
};
