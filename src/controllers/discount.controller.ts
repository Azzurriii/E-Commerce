import DiscountService from '@services/discount.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
// add discount
const addDiscount = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Discount created successfully',
		data: await DiscountService.addDiscount(req.body),
	}).send(res);
};

// get all discount
const getDiscounts = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Discounts fetched successfully',
		data: await DiscountService.getDiscounts(),
	}).send(res);
};

// get discount by product id
const getDiscountByProductId = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Discount by product id fetched successfully',
		data: await DiscountService.getDiscountByProductId(req.params.id),
	}).send(res);
};

// delete discount
const deleteDiscount = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Discount deleted successfully',
		data: await DiscountService.deleteDiscount(req.params.id),
	}).send(res);
};

// update discount
const updateDiscount = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Discount updated successfully',
		data: await DiscountService.updateDiscount(req.params.id, req.body),
	}).send(res);
};

// get single discount
const getDiscount = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Discount fetched successfully',
		data: await DiscountService.getDiscount(req.params.id),
	}).send(res);
};

export default {
	addDiscount,
	getDiscounts,
	deleteDiscount,
	updateDiscount,
	getDiscount,
	getDiscountByProductId,
};
