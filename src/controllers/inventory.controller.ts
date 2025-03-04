import InventoryService from '@services/inventory.service';
import { Request, Response, NextFunction } from 'express';
import { CREATED, OK } from '@handlers/response-handler';
// add inventory
const addInventory = async (req: Request, res: Response, next: NextFunction) => {
	return new CREATED({
		message: 'Inventory created successfully',
		data: await InventoryService.addInventory(req.body),
	}).send(res);
};

// get all inventory
const getInventories = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Inventories fetched successfully',
		data: await InventoryService.getInventories(),
	}).send(res);
};

// delete inventory
const deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Inventory deleted successfully',
		data: await InventoryService.deleteInventory(req.params.id),
	}).send(res);
};

// update inventory
const updateInventory = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Inventory updated successfully',
		data: await InventoryService.updateInventory(req.params.id, req.body),
	}).send(res);
};

// get single inventory
const getInventory = async (req: Request, res: Response, next: NextFunction) => {
	return new OK({
		message: 'Inventory fetched successfully',
		data: await InventoryService.getInventory(req.params.id),
	}).send(res);
};

export default {
	addInventory,
	getInventories,
	deleteInventory,
	updateInventory,
	getInventory,
};
