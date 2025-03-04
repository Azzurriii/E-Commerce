import { Types } from 'mongoose';

export interface ICreateProduct {
	name: string;
	desc: string;
	SKU: string;
	category_id: Types.ObjectId;
	inventory_id: Types.ObjectId;
	discount_id?: Types.ObjectId;
	price: number;
}

export interface IUpdateProduct {
	name?: string;
	desc?: string;
	SKU?: string;
	category_id?: Types.ObjectId;
	inventory_id?: Types.ObjectId;
	discount_id?: Types.ObjectId;
	price?: number;
}
