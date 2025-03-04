import Discount from '@models/discount.model';
import { ICreateDiscount, IUpdateDiscount } from '@interfaces/discount';
import { NotFoundError } from '@handlers/response-handler';

// create discount service
const addDiscount = async (data: ICreateDiscount) => {
	const discount = await Discount.create(data);
	return discount;
};

// get all discount
const getDiscounts = async () => {
	const discount = await Discount.find({});
	return discount;
};

// get discount by product id
const getDiscountByProductId = async (productId: string) => {
	const discount = await Discount.findOne({ productId });
	return discount;
};

// delete discount
const deleteDiscount = async (id: string) => {
	const result = await Discount.findByIdAndDelete(id);
	return result;
};

// update discount
const updateDiscount = async (id: string, payload: IUpdateDiscount) => {
	await getDiscount(id);
	const result = await Discount.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// get single discount
const getDiscount = async (id: string) => {
	const result = await Discount.findById(id);
	if (!result) {
		throw new NotFoundError('Discount not found !');
	}
	return result;
};

export default {
	addDiscount,
	getDiscounts,
	deleteDiscount,
	updateDiscount,
	getDiscount,
	getDiscountByProductId,
};
