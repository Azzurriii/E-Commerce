import { Request, Response, NextFunction } from 'express';
import { OK } from '@handlers/response-handler';
import CloudinaryService from '@services/cloudinary.service';

const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
	const result = await CloudinaryService.uploadImage(req.file!.buffer);
	return new OK({
		message: 'Image uploaded successfully',
		data: {
			url: result.secure_url,
			id: result.public_id,
		},
	}).send(res);
};

const uploadMultiple = async (req: Request, res: Response, next: NextFunction) => {
	const files = req.files as Express.Multer.File[];
	const uploadResults = await Promise.all(files.map((file) => CloudinaryService.uploadImage(file.buffer)));

	return new OK({
		message: 'Images uploaded successfully',
		data: uploadResults.map((result) => ({
			url: result.secure_url,
			id: result.public_id,
		})),
	}).send(res);
};

const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
	const { public_id } = req.query;
	const result = await CloudinaryService.deleteImage(public_id as string);

	return new OK({
		message: 'Image deleted successfully',
		data: result,
	}).send(res);
};

export default {
	uploadSingle,
	uploadMultiple,
	deleteImage,
};
