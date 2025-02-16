import Brand from '@models/brand.model';
import Product from '@models/product.model';
import { IBrand } from '@interfaces/brand';
import { NotFoundError } from '@handlers/response-handler';

// addBrand
const addBrand = async (data: IBrand) => {
	const brand = await Brand.create(data);
	return brand;
};

// create multiple Brands
const addBrands = async (data: IBrand[]) => {
	const brands = await Brand.insertMany(data);
	return brands;
};

// get all Brands
const getBrands = async () => {
	const brands = await Brand.find().populate({
		path: 'products',
		model: Product,
	});
	return brands;
};

// delete Brands
const deleteBrand = async (id: string) => {
	const brand = await Brand.findByIdAndDelete(id);
	if (!brand) {
		throw new NotFoundError('Brand not found!');
	}
	return brand;
};

// update brand
const updateBrand = async (id: string, payload: IBrand) => {
	const brand = await Brand.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	});
	if (!brand) {
		throw new NotFoundError('Brand not found!');
	}
	return brand;
};

// get single brand
const getBrandById = async (id: string) => {
	const brand = await Brand.findById(id).populate({
		path: 'products',
		model: Product,
	});
	if (!brand) {
		throw new NotFoundError('Brand not found!');
	}
	return brand;
};

// get active brands
const getActiveBrands = async () => {
	try {
		const brands = await Brand.find({ status: 'active' }).populate({
			path: 'products',
			model: Product,
		});
		return brands;
	} catch (error) {
		console.log('🔴 Error in getActiveBrands:', error);
		throw new NotFoundError('Brand not found!');
	}
};

export default {
	addBrand,
	addBrands,
	getBrands,
	deleteBrand,
	updateBrand,
	getBrandById,
	getActiveBrands,
};
