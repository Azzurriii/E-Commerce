import { Schema, model } from 'mongoose';
import CouponConstants, { ICoupon } from '@interfaces/coupon';
const DOCUMENT_NAME = 'Coupon';
const COLLECTION_NAME = 'Coupons';

const couponSchema = new Schema<ICoupon>(
	{
		title: {
			type: String,
			required: true,
		},
		logo: {
			type: String,
		},
		couponCode: {
			type: String,
			required: true,
		},
		startTime: {
			type: Date,
			required: false,
		},
		endTime: {
			type: Date,
			required: true,
		},
		discountPercentage: {
			type: Number,
			required: true,
		},
		minimumAmount: {
			type: Number,
			required: true,
		},
		productType: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(CouponConstants.CouponStatus),
			default: CouponConstants.CouponStatus.ACTIVE,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Coupon = model<ICoupon>(DOCUMENT_NAME, couponSchema);

export default Coupon;
