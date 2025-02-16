import { Types } from 'mongoose';

export interface IBrand {
	logo?: string;
	name: string;
	description?: string;
	email?: string;
	website?: string;
	location?: string;
	status?: 'active' | 'inactive';
	products: Types.ObjectId[];
	createdAt?: Date;
	updatedAt?: Date;
}
