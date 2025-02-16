import { Types } from 'mongoose';

export interface ICategory {
	img?: string;
	parent: string;
	children: string[];
	productType: string;
	description?: string;
	products: Types.ObjectId[];
	status: 'Show' | 'Hide';
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICreateCategory {
	img?: string;
	parent: string;
	children: string[];
	productType: string;
	description?: string;
}

export interface IUpdateCategory {
	img?: string;
	parent?: string;
	children?: string[];
	productType?: string;
	description?: string;
}
