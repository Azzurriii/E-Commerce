// import { Types } from 'mongoose';

// // Helper function to generate random names
// function generateRandomName(prefix: string, index: number): string {
// 	return `${prefix}${index}`;
// }

// // Helper function to generate random email
// function generateRandomEmail(name: string): string {
// 	return `${name.toLowerCase().replace(/\s/g, '.')}@example.com`;
// }

// // Helper function to generate ObjectId
// function generateObjectId(): Types.ObjectId {
// 	return new Types.ObjectId();
// }

// // ========================= apiKeysData =========================
// // export const apiKeysData = Array.from({ length: 10 }, (_, i) => {
// //     const apiKeyId = generateObjectId();
// //     return {
// //         _id: apiKeyId,
// //         key: generateRandomName('apiKey', i),
// //         status: i % 2 === 0, // alternate status
// //         permissions: [
// //             'read:products',
// //             i % 3 === 0 ? 'create:orders' : '',
// //             i % 2 === 0 ? 'update:inventory' : ''
// //         ].filter(Boolean),
// //         createdAt: new Date(`2024-01-${10 + i}T08:00:00Z`),
// //         updatedAt: new Date(`2024-01-${10 + i}T08:00:00Z`),
// //     };
// // });

// // ========================= usersData =========================
// export const usersData = Array.from({ length: 10 }, (_, i) => {
// 	const userId = generateObjectId();
// 	const name = generateRandomName('User', i + 1);
// 	const email = generateRandomEmail(name);
// 	return {
// 		_id: userId,
// 		name: name,
// 		email: email,
// 		password: '$2b$10$A1B2C3D4E5F6G7H8I9J0KLMNOPQRSTUVWXYZ', // hashed 'password123'
// 		status: 'active',
// 		verified: true,
// 		roles: ['user'],
// 		createdAt: new Date(`2024-01-${1 + i}T12:00:00Z`),
// 		updatedAt: new Date(`2024-01-${1 + i}T12:00:00Z`),
// 	};
// });

// // ========================= userAddressesData =========================
// export const userAddressesData = Array.from({ length: 10 }, (_, i) => {
// 	const addressId = generateObjectId();
// 	const userId = usersData[i % usersData.length]._id; // Cycle through users

// 	return {
// 		_id: addressId,
// 		user_id: userId,
// 		address_line1: `${100 + i} Beauty Blvd`,
// 		address_line2: i % 2 === 0 ? `Apt ${i + 1}` : null,
// 		city: 'Beverly Hills',
// 		postal_code: `${90210 + i}`,
// 		country: 'United States',
// 		telephone: `+1310555${1000 + i}`,
// 		mobile: `+1213555${2000 + i}`,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// });

// // ========================= keyTokensData =========================
// // export const keyTokensData = Array.from({ length: 10 }, (_, i) => {
// //     const tokenId = generateObjectId();
// //     const userId = usersData[i % usersData.length]._id; // Cycle through users
// //     return {
// //         _id: tokenId,
// //         user: userId,
// //         publicKey: `-----BEGIN PUBLIC KEY-----\nPUBLIC_KEY_${i}\n-----END PUBLIC KEY-----\n`,
// //         privateKey: `-----BEGIN RSA PRIVATE KEY-----\nPRIVATE_KEY_${i}\n-----END RSA PRIVATE KEY-----\n`,
// //         refreshTokensUsed: [],
// //         refreshToken: `REFRESH_TOKEN_${i}`,
// //         createdAt: new Date(`2024-01-${3 + i}T16:00:00Z`),
// //         updatedAt: new Date(`2024-01-${3 + i}T16:00:00Z`),
// //     };
// // });

// // ========================= shoppingSessionsData =========================
// export const shoppingSessionsData = Array.from({ length: 10 }, (_, i) => {
// 	const sessionId = generateObjectId();
// 	const userId = usersData[i % usersData.length]._id;

// 	return {
// 		_id: sessionId,
// 		user_id: userId,
// 		total: new Types.Decimal128(`${50 + i * 5}.00`),
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// });

// // ========================= discountsData =========================
// export const discountsData = Array.from({ length: 10 }, (_, i) => {
// 	const discountId = generateObjectId();
// 	return {
// 		_id: discountId,
// 		name: `Discount${i + 1}`,
// 		desc: `Discount description ${i + 1}`,
// 		discount_percent: new Types.Decimal128(`${5 + i * 2}.00`),
// 		active: i % 2 === 0,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// });

// // ========================= inventoriesData =========================
// export const inventoriesData = Array.from({ length: 10 }, (_, i) => {
// 	const inventoryId = generateObjectId();
// 	return {
// 		_id: inventoryId,
// 		quantity: 100 + i * 10,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// });

// // ========================= orderDetailsData =========================
// export const orderDetailsData = Array.from({ length: 10 }, (_, i) => {
// 	const orderId = generateObjectId();
// 	const userId = usersData[i % usersData.length]._id;
// 	return {
// 		_id: orderId,
// 		user_id: userId,
// 		total: new Types.Decimal128(`${100 + i * 10}.00`),
// 		payment_id: generateObjectId(),
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// });

// // ========================= paymentsData =========================
// export const paymentsData = Array.from({ length: 10 }, (_, i) => {
// 	const paymentId = generateObjectId();
// 	const orderId = orderDetailsData[i % orderDetailsData.length]._id; // Cycle through orders

// 	return {
// 		_id: paymentId,
// 		order_id: orderId,
// 		amount: parseFloat(orderDetailsData[i % orderDetailsData.length].total.toString()),
// 		provider: i % 2 === 0 ? 'PayPal' : 'Stripe',
// 		status: i % 3 === 0 ? 'completed' : 'pending',
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// });

// // ========================= orderItemsData =========================
// export const orderItemsData = Array.from({ length: 10 }, (_, i) => {
// 	const orderItemId = generateObjectId();
// 	const orderId = orderDetailsData[i % orderDetailsData.length]._id; //Cycle through orders
// 	const productId = generateObjectId(); //You'll want real product IDs here! Replace this when you have your product data.

// 	return {
// 		_id: orderItemId,
// 		order_id: orderId,
// 		product_id: productId,
// 		quantity: i + 1,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// });

// // ========================= cartsData =========================
// export const cartsData = Array.from({ length: 10 }, (_, i) => {
// 	const cartId = generateObjectId();
// 	const sessionId = shoppingSessionsData[i % shoppingSessionsData.length]._id;
// 	const productId = generateObjectId(); //Replace this with actual product IDs when you have your product data!

// 	return {
// 		_id: cartId,
// 		session_id: sessionId,
// 		product_id: productId,
// 		quantity: i + 1,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// });

// // Seed
// import User from '../models/user.model';
// import UserAddress from '../models/user-address.model';
// import ShoppingSession from '../models/cart.model';
// import Discount from '../models/discount.model';
// import Inventory from '../models/inventory.model';
// import Payment from '../models/payment.model';
// import OrderItem from '../models/order-item.model';
// import OrderDetail from '../models/order.model';
// import Cart from '../models/cart-item.model';
// import mongoose from 'mongoose';

// // Helper function to seed data
// async function seedData<T>(model: mongoose.Model<T>, data: T[], modelName: string) {
// 	try {
// 		// Check if data already exists
// 		const existingData = await model.find({});
// 		if (existingData.length > 0) {
// 			console.log(`${modelName} data already exists. Skipping seeding.`);
// 			return;
// 		}

// 		// Insert data
// 		await model.insertMany(data);
// 		console.log(`✅ Successfully seeded ${data.length} ${modelName} documents.`);
// 	} catch (error) {
// 		console.error(`❌ Error seeding ${modelName}:`, error);
// 		throw error; // Re-throw so the main function knows there was an error
// 	}
// }

// // Main seeding function
// export const seedAllData = async () => {
// 	try {
// 		console.log('Starting data seeding...');

// 		// Seed Users
// 		await seedData(User, usersData as any, 'Users');

// 		// Seed User Addresses
// 		await seedData(UserAddress, userAddressesData, 'UserAddresses');

// 		// Seed Shopping Sessions
// 		await seedData(ShoppingSession, shoppingSessionsData, 'ShoppingSessions');

// 		// Seed Discounts
// 		await seedData(Discount, discountsData, 'Discount');

// 		// Seed Inventories
// 		await seedData(Inventory, inventoriesData, 'Inventory');

// 		// Seed Order Details
// 		await seedData(OrderDetail, orderDetailsData, 'OrderDetails');

// 		// Seed Payments
// 		await seedData(Payment, paymentsData, 'Payments');

// 		// Seed Order Items
// 		await seedData(OrderItem, orderItemsData, 'OrderItem');

// 		// Seed Carts
// 		await seedData(Cart, cartsData, 'Cart');

// 		console.log('🎉 All data seeded successfully!');
// 	} catch (error) {
// 		console.error('🔥 Error during seeding process:', error);
// 		throw error; // Re-throw to handle the error at the top level
// 	}
// };
