import { productsData } from './products.data';

// Extract inventory IDs from products data
const inventoryIds = productsData.map((product) => product.inventory_id.toString());

// Create inventory data with random quantities
const inventoriesData = inventoryIds.map((id, index) => ({
	_id: id,
	quantity: Math.floor(Math.random() * 100) + 10, // Random quantity between 10 and 109
}));

export default inventoriesData;
