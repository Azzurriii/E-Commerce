import ProductService from '@services/product.service';
import InventoryService from '@services/inventory.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
// add product
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
	const { quantity } = req.body;
	const inventory = await InventoryService.addInventory({ quantity });
	return new CREATED({
		message: 'Product created successfully',
		data: await ProductService.addProduct({ ...req.body, inventory_id: inventory._id }),
	}).send(res);
};

// get all product
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	return new OK({
		message: 'Products fetched successfully',
		data: await ProductService.getProducts(page, limit),
	}).send(res);
};

// delete product
const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Product deleted successfully',
		data: await ProductService.deleteProduct(req.params.id),
	}).send(res);
};

// update product
const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Product updated successfully',
		data: await ProductService.updateProduct(req.params.id, req.body),
	}).send(res);
};

// get single product
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Product fetched successfully',
		data: await ProductService.getProduct(req.params.id),
	}).send(res);
};

// get products by category
const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	return new OK({
		message: 'Products fetched successfully',
		data: await ProductService.getProductsByCategory(req.params.category, page, limit),
	}).send(res);
};

// get best seller products
const getBestSellerProducts = async (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	return new OK({
		message: 'Products fetched successfully',
		data: await ProductService.getBestSellerProducts(page, limit),
	}).send(res);
};

// get products by price range
const getProductsByPriceRange = async (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	return new OK({
		message: 'Products fetched successfully',
		data: await ProductService.getProductsByPriceRange(
			Number(req.query.minPrice),
			Number(req.query.maxPrice),
			page,
			limit,
		),
	}).send(res);
};

// get most loved products
const getMostLovedProducts = async (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	return new OK({
		message: 'Products fetched successfully',
		data: await ProductService.getMostLovedProducts(page, limit),
	}).send(res);
};

// get product by set
const getProductBySet = async (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	return new OK({
		message: 'Product fetched successfully',
		data: await ProductService.getProductBySet(req.params.setId, page, limit),
	}).send(res);
};

// get products by discount
const getProductsByDiscount = async (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	return new OK({
		message: 'Products fetched successfully',
		data: await ProductService.getProductsByDiscount(page, limit),
	}).send(res);
};

// get products by search
const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;

	return new OK({
		message: 'Products fetched successfully',
		data: await ProductService.searchProducts(String(req.query.search), page, limit),
	}).send(res);
};

// get recommended products
const getRecommendedProducts = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Products fetched successfully',
		data: await ProductService.getRecommendedProducts(),
	}).send(res);
};

export default {
	addProduct,
	getProducts,
	deleteProduct,
	updateProduct,
	getProduct,
	getProductsByCategory,
	getBestSellerProducts,
	getProductsByPriceRange,
	getMostLovedProducts,
	getProductBySet,
	getProductsByDiscount,
	searchProducts,
	getRecommendedProducts,
};
