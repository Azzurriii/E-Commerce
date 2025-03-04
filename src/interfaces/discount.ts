export interface ICreateDiscount {
	name: string;
	desc?: string;
	discount_percent: number;
	active: boolean;
}

export interface IUpdateDiscount {
	name?: string;
	desc?: string;
	discount_percent?: number;
	active?: boolean;
}
