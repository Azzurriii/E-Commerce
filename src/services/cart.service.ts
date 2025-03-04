import Cart from '@models/cart.model';
import { ICreateCart, IUpdateCart } from '@interfaces/cart';
import { NotFoundError } from '@handlers/response-handler';
import CartItemService from '@services/cart-item.service';

// create cart service
const addCart = async (data: ICreateCart) => {
	const cart = await Cart.create(data);
	return cart;
};

// get all carts
const getCart = async (userId: string) => {
	let cart = await Cart.findOne({ user_id: userId }).lean();
	if (!cart) {
		cart = await addCart({ user_id: userId });
	}
	const cartItems = await CartItemService.getCartItems(cart._id.toString());
	return { ...cart, items: cartItems };
};

export default {
	addCart,
	getCart,
};
