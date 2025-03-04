import CartService from '@services/cart.service';
import CartItemService from '@services/cart-item.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
import ProductService from '@services/product.service';

// add cart
const addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.body.userId;
	const product = await ProductService.getProduct(req.body.product_id);
	let cart = await CartService.getCart(userId);
	await CartItemService.addCartItem(
		{
			cart_id: cart._id.toString(),
			product_id: product._id.toString(),
			quantity: req.body.quantity,
		},
		cart,
	);
	return new CREATED({
		message: 'Product added to cart successfully',
		data: await CartService.getCart(userId),
	}).send(res);
};

// get cart by user id
const getCart = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.body.userId;
	const cart = await CartService.getCart(userId);
	return new OK({
		message: 'Carts fetched successfully',
		data: cart,
	}).send(res);
};

// delete cart
const deleteProductFromCart = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.body.userId;
	const productId = req.params.productId;
	await ProductService.getProduct(productId);
	const cart = await CartService.getCart(userId);
	await CartItemService.deleteCartItem(cart._id.toString(), productId);
	return new OK({
		message: 'Product deleted from cart successfully',
		data: await CartService.getCart(userId),
	}).send(res);
};

// update cart
const updateProductInCart = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.body.userId;
	const productId = req.params.productId;
	const quantity = req.body.quantity;
	await ProductService.getProduct(productId);
	const cart = await CartService.getCart(userId);
	await CartItemService.updateCartItem(cart._id.toString(), productId, quantity);
	return new OK({
		message: 'Product updated in cart successfully',
		data: await CartService.getCart(userId),
	}).send(res);
};

export default {
	addProductToCart,
	getCart,
	deleteProductFromCart,
	updateProductInCart,
};
