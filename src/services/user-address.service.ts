import UserAddress from '@models/user-address.model';
import { ICreateUserAddress, IUpdateUserAddress } from '@interfaces/user-address';
import { NotFoundError } from '@handlers/response-handler';

// create user address service
const addUserAddress = async (data: ICreateUserAddress) => {
	const userAddress = await UserAddress.create(data);
	return userAddress;
};

// get all user address
const getUserAddresses = async () => {
	const userAddress = await UserAddress.find({});
	return userAddress;
};

// get user address by user id
const getUserAddressByUserId = async (userId: string) => {
	const userAddress = await UserAddress.find({ user_id: userId });
	return userAddress;
};

// delete user address
const deleteUserAddress = async (id: string) => {
	const result = await UserAddress.findByIdAndDelete(id);
	return result;
};

// update user address
const updateUserAddress = async (id: string, payload: IUpdateUserAddress) => {
	await getUserAddress(id);
	const result = await UserAddress.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// get single user address
const getUserAddress = async (id: string) => {
	const result = await UserAddress.findById(id);
	if (!result) {
		throw new NotFoundError('User address not found !');
	}
	return result;
};

export default {
	addUserAddress,
	getUserAddresses,
	deleteUserAddress,
	updateUserAddress,
	getUserAddress,
	getUserAddressByUserId,
};
