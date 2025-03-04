import express from 'express';
import ProductController from '@controllers/product.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */
const router = express.Router({ mergeParams: true });

// GET Method doesn't need authentication and permission
// Get products
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */
router.get('/', asyncHandler(ProductController.getProducts));

// Get a single product by ID
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/:id', asyncHandler(ProductController.getProduct));

// Get products by category
/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of products by category
 *       404:
 *         description: Category not found
 */
router.get('/category/:category', asyncHandler(ProductController.getProductsByCategory));

// Get products by discount
/**
 * @swagger
 * /products/discount/{discountId}:
 *   get:
 *     summary: Get products by discount
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: discountId
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of products by discount
 *       404:
 *         description: Discount not found
 */
router.get('/discount/:discountId', asyncHandler(ProductController.getProductsByDiscount));

// Get recommended products
/**
 * @swagger
 * /products/recommended:
 *   get:
 *     summary: Get recommended products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of recommended products
 *       404:
 *         description: No recommended products found
 */
router.get('/recommended', asyncHandler(ProductController.getRecommendedProducts));

// Get products by search
/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by name or description
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "Electronics"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of products matching the search query
 *       404:
 *         description: No products found matching the search query
 */
router.get('/search', asyncHandler(ProductController.searchProducts));

// Get best seller products
/**
 * @swagger
 * /products/bestseller:
 *   get:
 *     summary: Get best seller products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of best seller products
 *       404:
 *         description: No best seller products found
 */
router.get('/bestseller', asyncHandler(ProductController.getBestSellerProducts));

// Get products by price range
/**
 * @swagger
 * /products/price-range:
 *   get:
 *     summary: Get products by price range
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         required: true
 *         schema:
 *           type: number
 *           example: 100
 *       - in: query
 *         name: maxPrice
 *         required: true
 *         schema:
 *           type: number
 *           example: 1000
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of products by price range
 *       404:
 *         description: No products found by price range
 */
router.get('/price-range', asyncHandler(ProductController.getProductsByPriceRange));

// get most loved products
/**
 * @swagger
 * /products/most-loved:
 *   get:
 *     summary: Get most loved products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of most loved products
 *       404:
 *         description: No most loved products found
 */
router.get('/most-loved', asyncHandler(ProductController.getMostLovedProducts));

// Get product by set
/**
 * @swagger
 * /products/set/{setId}:
 *   get:
 *     summary: Get product by set
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: setId
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Product by set
 *       404:
 *         description: Product not found by set
 */
router.get('/set/:setId', asyncHandler(ProductController.getProductBySet));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a new product
/**
 * @swagger
 * /products/:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
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
 *               SKU:
 *                 type: string
 *                 example: "1234567890"
 *               price:
 *                 type: number
 *                 example: 1000
 *               category_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               discount_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               quantity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(ProductController.addProduct));

// Delete a product
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', asyncHandler(ProductController.deleteProduct));

// Update a product
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
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
 *                 example: Updated description for product
 *               SKU:
 *                 type: string
 *                 example: 1234567890
 *               price:
 *                 type: number
 *                 example: 1000
 *               category_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               discount_id:
 *                 type: string
 *                 example: "63fc42e6d2f1f48b606f6baf"
 *               quantity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put('/:id', asyncHandler(ProductController.updateProduct));

export default (): express.Router => {
	return router;
};
