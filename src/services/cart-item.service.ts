import CartItem from '@models/cart-item.model';
import { ICreateCartItem } from '@interfaces/cart-item';

// get all cart items
const getCartItems = async (cartId: string) => {
	const cartItems = await CartItem.find({ cart_id: cartId }).populate('product_id');
	return cartItems;
};

// add cart item
const addCartItem = async (data: ICreateCartItem, cart: any) => {
	let cartItem = cart.items.find((item: any) => item.product_id === data.product_id);
	if (cartItem) {
		cartItem = await CartItem.findByIdAndUpdate(cartItem.id, { $inc: { quantity: data.quantity } }, { new: true });
	} else {
		cartItem = await CartItem.create(data);
	}
	return cartItem;
};

// delete cart item
const deleteCartItem = async (cartId: string, productId: string) => {
	await CartItem.findOneAndDelete({ cart_id: cartId, product_id: productId });
};

// update cart item
const updateCartItem = async (cartId: string, productId: string, quantity: number) => {
	await CartItem.findOneAndUpdate({ cart_id: cartId, product_id: productId }, { quantity: quantity });
};

export default {
	getCartItems,
	addCartItem,
	deleteCartItem,
	updateCartItem,
};
