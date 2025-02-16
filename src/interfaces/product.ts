import { Types } from 'mongoose';

export interface IProduct {
	sku: string;
	img: string;
	title: string;
	slug: string;
	unit: string;
	imageURLs: {
		color: {
			name: string;
			clrCode: string;
		};
		img: string;
	}[];
	parent: string;
	children: string;
	price: number;
	discount: number;
	quantity: number;
	brand: {
		name: string;
		id: string;
	};
	category: {
		name: string;
		id: string;
	};
	status: string;
	reviews: Types.ObjectId[];
	productType: string;
	description: string;
	videoId: string;
	additionalInformation: {
		key: string;
		value: string;
	}[];
	tags: string[];
	sizes: string[];
	offerDate: {
		startDate: Date;
		endDate: Date;
	};
	featured: boolean;
	sellCount: number;
}

export interface ICreateProduct {
	sku: string;
	img: string;
	title: string;
	slug: string;
	unit: string;
	imageURLs: {
		color: {
			name: string;
			clrCode: string;
		};
		img: string;
	}[];
	parent: string;
	children: string;
	price: number;
	discount: number;
	quantity: number;
	brand: string;
	category: string;
	status: string;
	reviews: string[];
	productType: string;
	description: string;
	videoId: string;
	additionalInformation: {
		key: string;
		value: string;
	}[];
	tags: string[];
	sizes: string[];
	offerDate: {
		startDate: Date;
		endDate: Date;
	};
	featured: boolean;
}

export interface IUpdateProduct {
	sku?: string;
	img?: string;
	title?: string;
	slug?: string;
	unit?: string;
	imageURLs?: {
		color: {
			name: string;
			clrCode: string;
		};
		img: string;
	}[];
	parent?: string;
	children?: string;
	price?: number;
	discount?: number;
	quantity?: number;
	brand?: string;
	category?: string;
	status?: string;
	reviews?: string[];
	productType?: string;
	description?: string;
	videoId?: string;
	additionalInformation?: {
		key: string;
		value: string;
	}[];
	tags?: string[];
	sizes?: string[];
	offerDate?: {
		startDate: Date;
		endDate: Date;
	};
	featured?: boolean;
}

export interface IGetProductQuery {
	new?: boolean;
	featured?: boolean;
	topSellers?: boolean;
	limit: number;
	skip: number;
}

export interface IGetOfferTimerProductQuery {
	productType: string;
}
