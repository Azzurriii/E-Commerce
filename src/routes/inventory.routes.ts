import express from 'express';
import InventoryController from '@controllers/inventory.controller';
import { asyncHandler } from '@middlewares/error.middleware';
import MiddlewareAuthorization from '@middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Inventories
 *   description: Inventory management APIs
 */
const router = express.Router({ mergeParams: true });

// GET Method doesn't need authentication and permission
// Get inventories
/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Get all inventories
 *     tags: [Inventories]
 *     responses:
 *       200:
 *         description: List of all inventories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   quantity:
 *                     type: number
 */
router.get('/', asyncHandler(InventoryController.getInventories));

// Get a single inventory by ID
/**
 * @swagger
 * /inventories/{id}:
 *   get:
 *     summary: Get a single inventory by ID
 *     tags: [Inventories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Inventory details
 *       404:
 *         description: Inventory not found
 */
router.get('/:id', asyncHandler(InventoryController.getInventory));

// POST, PATCH, DELETE Method needs authentication and permission
// Middleware
router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));

// Add a new inventory
/**
 * @swagger
 * /inventories/:
 *   post:
 *     summary: Add a new inventory
 *     tags: [Inventories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', asyncHandler(InventoryController.addInventory));

// Delete a inventory
/**
 * @swagger
 * /inventories/{id}:
 *   delete:
 *     summary: Delete a inventory by ID
 *     tags: [Inventories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 63fc42e6d2f1f48b606f6baf
 *     responses:
 *       200:
 *         description: Inventory deleted successfully
 *       404:
 *         description: Inventory not found
 */
router.delete('/:id', asyncHandler(InventoryController.deleteInventory));

// Update a inventory
/**
 * @swagger
 * /inventories/{id}:
 *   put:
 *     summary: Update a inventory by ID
 *     tags: [Inventories]
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
 *               quantity:
 *                 type: number
 *                 example: 200
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *       404:
 *         description: Inventory not found
 */
router.put('/:id', asyncHandler(InventoryController.updateInventory));

export default (): express.Router => {
	return router;
};
