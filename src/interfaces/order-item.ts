export interface ICreateOrderItem {
	order_id: string;
	product_id: string;
	quantity: number;
}

export interface IUpdateOrderItem {
	quantity: number;
}
