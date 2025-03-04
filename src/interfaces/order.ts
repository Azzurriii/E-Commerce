export interface ICreateOrder {
	user_id: string;
	total: number;
	payment_id: string;
}

export interface IUpdateOrder {
	total: number;
	payment_id: string;
}
