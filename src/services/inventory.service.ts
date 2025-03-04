import Inventory from '@models/inventory.model';
import { ICreateInventory, IUpdateInventory } from '@interfaces/inventory';
import { NotFoundError } from '@handlers/response-handler';

// create category service
const addInventory = async (data: ICreateInventory) => {
	const inventory = await Inventory.create(data);
	return inventory;
};

// get all category
const getInventories = async () => {
	const inventory = await Inventory.find({});
	return inventory;
};

// delete category
const deleteInventory = async (id: string) => {
	const result = await Inventory.findByIdAndDelete(id);
	return result;
};

// update inventory
const updateInventory = async (id: string, payload: IUpdateInventory) => {
	await getInventory(id);
	const result = await Inventory.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// get single category
const getInventory = async (id: string) => {
	const result = await Inventory.findById(id);
	if (!result) {
		throw new NotFoundError('Inventory not found !');
	}
	return result;
};

export default {
	addInventory,
	getInventories,
	deleteInventory,
	updateInventory,
	getInventory,
};
