import Category from '@models/category.model';
import Product from '@models/product.model';
import { ICreateCategory, IUpdateCategory } from '@src/interfaces/category';
import { NotFoundError } from '@handlers/response-handler';

// create category service
const addCategory = async (data: ICreateCategory) => {
	const category = await Category.create(data);
	return category;
};

// get all category
const getCategories = async () => {
	const category = await Category.find({});
	return category;
};

// delete category
const deleteCategory = async (id: string) => {
	const result = await Category.findByIdAndDelete(id);
	return result;
};

// update category
const updateCategory = async (id: string, payload: IUpdateCategory) => {
	await getCategory(id);
	const result = await Category.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// get single category
const getCategory = async (id: string) => {
	const result = await Category.findById(id);
	if (!result) {
		throw new NotFoundError('Category not found !');
	}
	return result;
};

export default {
	addCategory,
	getCategories,
	deleteCategory,
	updateCategory,
	getCategory,
};
