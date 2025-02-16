import multer from 'multer';
import path from 'path';
import { BadRequestError } from '@handlers/response-handler';
import { Request } from 'express';

const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
	const supportedImage = /png|jpg|jpeg|webp/;
	const extension = path.extname(file.originalname).toLowerCase();

	if (supportedImage.test(extension.substring(1))) {
		cb(null, true);
	} else {
		cb(new BadRequestError('Unsupported file type. Only PNG, JPG, JPEG, WEBP allowed'));
	}
};

const uploader = multer({
	storage: multer.memoryStorage(),
	fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
	},
});

export default uploader;
