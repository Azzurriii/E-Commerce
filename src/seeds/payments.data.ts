const paymentsData = [
	// Payments for first user's orders
	{
		_id: '67a36f77497df40e9471e2c0', // This matches payment_id in orders.data.ts
		order_id: '67a36f77497df40e9471e2b0', // First order of first user
		amount: 123.0,
		provider: 'stripe',
		status: 'completed',
	},
	{
		_id: '67a36f77497df40e9471e2c1', // This matches payment_id in orders.data.ts
		order_id: '67a36f77497df40e9471e2b1', // Second order of first user
		amount: 85.5,
		provider: 'stripe',
		status: 'completed',
	},

	// Payments for second user's orders
	{
		_id: '67c3ebd4ae7c6789e7907db0', // This matches payment_id in orders.data.ts
		order_id: '67c3ebd4ae7c6789e7907da0', // First order of second user
		amount: 150.25,
		provider: 'paypal',
		status: 'completed',
	},
	{
		_id: '67c3ebd4ae7c6789e7907db1', // This matches payment_id in orders.data.ts
		order_id: '67c3ebd4ae7c6789e7907da1', // Second order of second user
		amount: 67.8,
		provider: 'stripe',
		status: 'completed',
	},
];

export default paymentsData;
