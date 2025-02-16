import CategoryService from '@services/category.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
// add category
const addCategory = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Category created successfully',
		data: await CategoryService.addCategory(req.body),
	}).send(res);
};

// add all category
const addCategories = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Categories created successfully',
		data: await CategoryService.addCategories(req.body),
	}).send(res);
};

// get all show category
const getShowCategory = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Categories fetched successfully',
		data: await CategoryService.getShowCategory(),
	}).send(res);
};

// get all category
const getCategories = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Categories fetched successfully',
		data: await CategoryService.getCategories(),
	}).send(res);
};

// get product type category
const getProductTypeCategory = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Categories fetched successfully',
		data: await CategoryService.getCategoryType(req.params.type),
	}).send(res);
};

// delete category
const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Category deleted successfully',
		data: await CategoryService.deleteCategory(req.params.id),
	}).send(res);
};

// update category
const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Category updated successfully',
		data: await CategoryService.updateCategory(req.params.id, req.body),
	}).send(res);
};

// get single category
const getCategory = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Category fetched successfully',
		data: await CategoryService.getCategory(req.params.id),
	}).send(res);
};

export default {
	addCategory,
	addCategories,
	getShowCategory,
	getCategories,
	getProductTypeCategory,
	deleteCategory,
	updateCategory,
	getCategory,
};
