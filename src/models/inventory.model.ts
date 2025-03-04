import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Inventory';
const COLLECTION_NAME = 'Inventories';

const inventorySchema = new Schema(
	{
		quantity: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

const Inventory = model(DOCUMENT_NAME, inventorySchema);
export default Inventory;
