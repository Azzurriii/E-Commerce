const CouponStatus = {
	DRAFT: 'draft',
	ACTIVE: 'active',
	INACTIVE: 'inactive',
};
export type CouponStatus = (typeof CouponStatus)[keyof typeof CouponStatus];

export interface ICoupon {
	title: string;
	logo: string;
	couponCode: string;
	startTime?: Date;
	endTime: Date;
	discountPercentage: number;
	minimumAmount: number;
	productType: string;
	status: CouponStatus;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICreateCoupon {
	title: string;
	logo: string;
	couponCode: string;
	startTime: Date;
	endTime: Date;
	discountPercentage: number;
	minimumAmount: number;
	productType: string;
	status: CouponStatus;
}

export default { CouponStatus };
