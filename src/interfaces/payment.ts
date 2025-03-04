export interface ICreatePayment {
	order_id: string;
	amount: number;
	provider: string;
	status: string;
}

export interface IUpdatePayment {
	amount?: number;
	provider?: string;
	status?: string;
}
