import { Request, Response, NextFunction } from 'express';
import ProductServices from '@services/product.service';
import { CREATED, OK } from '@handlers/response-handler';
import { IGetProductQuery, IGetOfferTimerProductQuery } from '@interfaces/product';

// add product
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
	console.log('product--->', req.body);
	const firstItem = {
		color: {
			name: '',
			clrCode: '',
		},
		img: req.body.img,
	};
	const imageURLs = [...req.body.imageURLs, firstItem];
	const result = await ProductServices.addProduct({
		...req.body,
		imageURLs: imageURLs,
	});
	console.log('product-result', result);
	return new CREATED({
		message: 'Product created successfully!',
		data: result,
	}).send(res);
};

// add all product
const addProducts = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.addProducts(req.body);
	return new CREATED({
		message: 'Products added successfully',
		data: result,
	}).send(res);
};

// get all products
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.getProducts();
	return new OK({
		message: 'Products fetched successfully',
		data: result,
	}).send(res);
};

// get all products by type
const getProductsByType = async (req: Request, res: Response, next: NextFunction) => {
	const query: IGetProductQuery = {
		limit: Number(req.query.limit) || 10,
		skip: Number(req.query.skip) || 0,
		new: req.query.new === 'true',
		featured: req.query.featured === 'true',
		topSellers: req.query.topSellers === 'true',
	};
	const result = await ProductServices.getProductType(req.params.type, query);
	return new OK({
		message: 'Products fetched successfully',
		data: result,
	}).send(res);
};

// get offer product controller
const getOfferTimerProducts = async (req: Request, res: Response, next: NextFunction) => {
	const query: IGetOfferTimerProductQuery = {
		productType: req.query.type as string,
	};
	const result = await ProductServices.getOfferTimerProduct(query);
	return new OK({
		message: 'Products fetched successfully',
		data: result,
	}).send(res);
};

// get Popular Product By Type
const getPopularProductByType = async (req: Request, res: Response, next: NextFunction) => {
	const query: IGetProductQuery = {
		limit: Number(req.query.limit) || 10,
		skip: Number(req.query.skip) || 0,
	};
	const result = await ProductServices.getPopularProductByType(req.params.type, query);
	return new OK({
		message: 'Products fetched successfully',
		data: result,
	}).send(res);
};

// get top rated Products
const getTopRatedProducts = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.getTopRatedProduct();
	return new OK({
		message: 'Products fetched successfully',
		data: result,
	}).send(res);
};

// getSingleProduct
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.getProduct(req.params.id);
	return new OK({
		message: 'Product fetched successfully',
		data: result,
	}).send(res);
};

// get Related Product
const getRelatedProducts = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.getRelatedProduct(req.params.id);
	return new OK({
		message: 'Products fetched successfully',
		data: result,
	}).send(res);
};

// update product
const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.updateProduct(req.params.id, req.body);
	return new OK({
		message: 'Product updated successfully',
		data: result,
	}).send(res);
};

// get Reviews Products
const getReviewsProducts = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.getReviewsProducts();
	return new OK({
		message: 'Products fetched successfully',
		data: result,
	}).send(res);
};

// get Stock Out Products
const getStockOutProducts = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.getStockOutProducts();
	return new OK({
		message: 'Products fetched successfully',
		data: result,
	}).send(res);
};

// delete product
const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
	const result = await ProductServices.deleteProduct(req.params.id);
	return new OK({
		message: 'Product delete successfully',
		data: result,
	}).send(res);
};

export default {
	addProduct,
	addProducts,
	getProducts,
	getProductsByType,
	getOfferTimerProducts,
	getPopularProductByType,
	getTopRatedProducts,
	getProduct,
	getRelatedProducts,
	updateProduct,
	getReviewsProducts,
	getStockOutProducts,
	deleteProduct,
};
