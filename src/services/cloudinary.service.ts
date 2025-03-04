import cloudinary from '@configs/cloudinary';
import { Readable } from 'stream';

const uploadImage = (imageBuffer: Buffer): Promise<any> => {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{ upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
			(error: any, result: any) => {
				if (error) {
					console.error('Error uploading to Cloudinary:', error);
					reject(error);
				} else {
					resolve(result);
				}
			},
		);

		const bufferStream = new Readable();
		bufferStream.push(imageBuffer);
		bufferStream.push(null);

		bufferStream.pipe(uploadStream);
	});
};

const deleteImage = async (publicId: string) => {
	return await cloudinary.uploader.destroy(publicId);
};

export default {
	uploadImage,
	deleteImage,
};
