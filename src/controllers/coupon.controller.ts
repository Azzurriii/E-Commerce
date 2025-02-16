import { Request, Response, NextFunction } from 'express';
import CouponService from '@services/coupon.service';
import { OK } from '@handlers/response-handler';
// addCoupon
const addCoupon = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Coupon Added Successfully!',
		data: await CouponService.addCoupon(req.body),
	}).send(res);
};
// addAllCoupon
const addCoupons = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Coupon Added Successfully!',
		data: await CouponService.addCoupons(req.body),
	}).send(res);
};
// getAllCoupons
const getCoupons = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Coupon Added Successfully!',
		data: await CouponService.getCoupons(),
	}).send(res);
};
// getCouponById
const getCoupon = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Coupon Added Successfully!',
		data: await CouponService.getCoupon(req.params.id),
	}).send(res);
};

// updateCoupon
const updateCoupon = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Coupon Updated Successfully!',
		data: await CouponService.updateCoupon(req.params.id, req.body),
	}).send(res);
};
// deleteCoupon
const deleteCoupon = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Coupon Deleted Successfully!',
		data: await CouponService.deleteCoupon(req.params.id),
	}).send(res);
};

export default {
	addCoupon,
	addCoupons,
	getCoupons,
	getCoupon,
	updateCoupon,
	deleteCoupon,
};
