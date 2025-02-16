import { NextFunction, Request, Response } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
import BrandService from '@services/brand.service';

const addBrand = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Brand created successfully',
		data: await BrandService.addBrand(req.body),
	}).send(res);
};

const addBrands = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Brands added successfully',
		data: await BrandService.addBrands(req.body),
	}).send(res);
};

const getBrands = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Brands fetched successfully',
		data: await BrandService.getBrands(),
	}).send(res);
};

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Brand deleted successfully',
		data: await BrandService.deleteBrand(req.params.id),
	}).send(res);
};

const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Brand updated successfully',
		data: await BrandService.updateBrand(req.params.id, req.body),
	}).send(res);
};

const getBrandById = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Brand fetched successfully',
		data: await BrandService.getBrandById(req.params.id),
	}).send(res);
};

const getActiveBrands = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Active brands fetched successfully',
		data: await BrandService.getActiveBrands(),
	}).send(res);
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
