import UserAddressService from '@services/user-address.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';

// add user address
const addUserAddress = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'User address created successfully',
		data: await UserAddressService.addUserAddress(req.body),
	}).send(res);
};

// get all user address
const getUserAddresses = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'User addresses fetched successfully',
		data: await UserAddressService.getUserAddresses(),
	}).send(res);
};

// delete user address
const deleteUserAddress = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'User address deleted successfully',
		data: await UserAddressService.deleteUserAddress(req.params.id),
	}).send(res);
};

// update user address
const updateUserAddress = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'User address updated successfully',
		data: await UserAddressService.updateUserAddress(req.params.id, req.body),
	}).send(res);
};

// get single user address
const getUserAddress = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'User address fetched successfully',
		data: await UserAddressService.getUserAddress(req.params.id),
	}).send(res);
};

// get user address by user id
const getUserAddressByUserId = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'User address fetched successfully',
		data: await UserAddressService.getUserAddressByUserId(req.params.userId),
	}).send(res);
};

export default {
	addUserAddress,
	getUserAddresses,
	deleteUserAddress,
	updateUserAddress,
	getUserAddress,
	getUserAddressByUserId,
};
