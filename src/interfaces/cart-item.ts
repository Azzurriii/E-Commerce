export interface ICreateCartItem {
	cart_id: string;
	product_id: string;
	quantity: number;
}

export interface IUpdateCartItem {
	quantity: number;
}
