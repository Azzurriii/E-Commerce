import Coupon from '@models/coupon.model';
import { ICreateCoupon } from '@interfaces/coupon';
import { NotFoundError } from '@handlers/response-handler';

// addCoupon
const addCoupon = async (data: ICreateCoupon) => {
	const coupon = await Coupon.create(data);
	return coupon;
};

// addAllCoupon
const addCoupons = async (data: ICreateCoupon[]) => {
	const coupons = await Coupon.insertMany(data);
	return coupons;
};

// getAllCoupons
const getCoupons = async () => {
	const coupons = await Coupon.find({}).sort({ _id: -1 });
	return coupons;
};

// getCouponById
const getCoupon = async (id: string) => {
	const coupon = await Coupon.findById(id);
	if (!coupon) {
		throw new NotFoundError('Coupon not found');
	}
	return coupon;
};
// updateCoupon
const updateCoupon = async (id: string, data: ICreateCoupon) => {
	await getCoupon(id);
	const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true });
	return coupon;
};
// deleteCoupon
const deleteCoupon = async (id: string) => {
	await getCoupon(id);
	return await Coupon.deleteOne({ _id: id });
};

export default {
	addCoupon,
	addCoupons,
	getCoupons,
	getCoupon,
	updateCoupon,
	deleteCoupon,
};
