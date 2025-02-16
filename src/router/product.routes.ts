import express from 'express';
import ProductController from '@controllers/product.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */
// GET method do not need to be authenticated

// Get all products
/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
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
 *                   price:
 *                     type: number
 */
router.get('/all', asyncHandler(ProductController.getProducts));

// Get offer timer products
/**
 * @swagger
 * /products/offer:
 *   get:
 *     summary: Retrieve products with active offer timers
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products with offer timers
 */
router.get('/offer', asyncHandler(ProductController.getOfferTimerProducts));

// Get top-rated products
/**
 * @swagger
 * /products/top-rated:
 *   get:
 *     summary: Retrieve top-rated products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of top-rated products
 */
router.get('/top-rated', asyncHandler(ProductController.getTopRatedProducts));

// Review products
/**
 * @swagger
 * /products/review-product:
 *   get:
 *     summary: Retrieve products with reviews
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products with reviews
 */
router.get('/review-product', asyncHandler(ProductController.getReviewsProducts));

// Get popular products by type
/**
 * @swagger
 * /products/popular/{type}:
 *   get:
 *     summary: Retrieve popular products by type
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         example: Electronics
 *     responses:
 *       200:
 *         description: List of popular products by type
 */
router.get('/popular/:type', asyncHandler(ProductController.getPopularProductByType));

// Get related products
/**
 * @swagger
 * /products/related-product/{id}:
 *   get:
 *     summary: Retrieve related products by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: List of related products
 */
router.get('/related-product/:id', asyncHandler(ProductController.getRelatedProducts));

// Get stock-out products
/**
 * @swagger
 * /products/stock-out:
 *   get:
 *     summary: Retrieve out-of-stock products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of out-of-stock products
 */
router.get('/stock-out', asyncHandler(ProductController.getStockOutProducts));

// Get products by type
/**
 * @swagger
 * /products/{type}:
 *   get:
 *     summary: Retrieve products by type
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         example: Electronics
 *     responses:
 *       200:
 *         description: List of products by type
 */
router.get('/:type', asyncHandler(ProductController.getProductsByType));

// Get a single product
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Product details
 */
router.get('/:id', asyncHandler(ProductController.getProduct));

// Middleware for POST, PATCH, DELETE
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));
// Add a single product
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
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               productType:
 *                 type: string
 *               brand:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *               quantity:
 *                 type: number
 *               children:
 *                 type: string
 *               parent:
 *                 type: string
 *               unit:
 *                 type: string
 *               img:
 *                 type: string
 *               category:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *               imageURLs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     color:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         clrCode:
 *                           type: string
 *                     img:
 *                       type: string
 *                     sizes:
 *                       type: array
 *                       items:
 *                         type: string
 *               status:
 *                 type: string
 *                 enum: ["in-stock", "out-of-stock", "discontinued"]
 *           example:
 *             title: "iPhone 13"
 *             price: 999.99
 *             description: "Latest iPhone model with amazing features"
 *             productType: "smartphone"
 *             brand:
 *               id: "643134d4e2c1bd22cebb2130"
 *               name: "Apple"
 *             quantity: 100
 *             children: "Tablet"
 *             parent: "Smartphone"
 *             unit: "piece"
 *             img: "http://example.com/main-image.jpg"
 *             category:
 *               id: "63fc42e6d2f1f48b606f6baf"
 *               name: "Electronics"
 *             imageURLs: [
 *               {
 *                 color: {
 *                   name: "Black",
 *                   clrCode: "#000000"
 *                 },
 *                 img: "http://example.com/image1.jpg",
 *                 sizes: ["64GB", "128GB", "256GB"]
 *               }
 *             ]
 *             status: "in-stock"
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', asyncHandler(ProductController.addProduct));

// Add multiple products
/**
 * @swagger
 * /products/multiple:
 *   post:
 *     summary: Add multiple products
 *     tags: [Products]
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
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 productType:
 *                   type: string
 *                 brand:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 quantity:
 *                   type: number
 *                 children:
 *                   type: string
 *                 parent:
 *                   type: string
 *                 unit:
 *                   type: string
 *                 img:
 *                   type: string
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                 imageURLs:
 *                   type: array
 *                   items:
 *                     type: object
 *           example: [
 *             {
 *               title: "iPhone 13",
 *               price: 999.99,
 *               description: "Latest iPhone model with amazing features",
 *               productType: "smartphone",
 *               brand: {
 *                 id: "643134d4e2c1bd22cebb2130",
 *                 name: "Apple"
 *               },
 *               quantity: 100,
 *               children: "Tablet",
 *               parent: "Smartphone",
 *               unit: "piece",
 *               img: "http://example.com/main-image.jpg",
 *               category: {
 *                 id: "63fc42e6d2f1f48b606f6baf",
 *                 name: "Electronics"
 *               },
 *               imageURLs: [
 *                 {
 *                   color: {
 *                     name: "Black",
 *                     clrCode: "#000000"
 *                   },
 *                   img: "http://example.com/image1.jpg",
 *                   sizes: ["64GB", "128GB", "256GB"]
 *                 }
 *               ],
 *               status: "in-stock"
 *             },
 *             {
 *               title: "iPhone 13 Pro",
 *               price: 1299.99,
 *               description: "Pro version of iPhone 13 with advanced features",
 *               productType: "smartphone",
 *               brand: {
 *                 id: "643134d4e2c1bd22cebb2130",
 *                 name: "Apple"
 *               },
 *               quantity: 50,
 *               children: "Tablet",
 *               parent: "Smartphone",
 *               unit: "piece",
 *               img: "http://example.com/main-image-pro.jpg",
 *               category: {
 *                 id: "63fc42e6d2f1f48b606f6baf",
 *                 name: "Electronics"
 *               },
 *               imageURLs: [
 *                 {
 *                   color: {
 *                     name: "Silver",
 *                     clrCode: "#C0C0C0"
 *                   },
 *                   img: "http://example.com/image1-pro.jpg",
 *                   sizes: ["128GB", "256GB", "512GB"]
 *                 }
 *               ],
 *               status: "in-stock"
 *             }
 *           ]
 *     responses:
 *       201:
 *         description: Products added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/multiple', asyncHandler(ProductController.addProducts));

// Update a product
/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
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
 *                 example: Updated Product Title
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.patch('/:id', asyncHandler(ProductController.updateProduct));

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
 *         example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete('/:id', asyncHandler(ProductController.deleteProduct));

export default (): express.Router => {
	return router;
};
