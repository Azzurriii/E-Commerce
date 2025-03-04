const ordersData = [
	// Orders for first user
	{
		_id: '67a36f77497df40e9471e2b0',
		user_id: '67a36f77497df40e9471e2a1',
		total: 123.0,
		payment_id: '67a36f77497df40e9471e2c0', // Reference to a payment detail
	},
	{
		_id: '67a36f77497df40e9471e2b1',
		user_id: '67a36f77497df40e9471e2a1',
		total: 85.5,
		payment_id: '67a36f77497df40e9471e2c1', // Reference to a payment detail
	},

	// Orders for second user
	{
		_id: '67c3ebd4ae7c6789e7907da0',
		user_id: '67c3ebd4ae7c6789e7907d93',
		total: 150.25,
		payment_id: '67c3ebd4ae7c6789e7907db0', // Reference to a payment detail
	},
	{
		_id: '67c3ebd4ae7c6789e7907da1',
		user_id: '67c3ebd4ae7c6789e7907d93',
		total: 67.8,
		payment_id: '67c3ebd4ae7c6789e7907db1', // Reference to a payment detail
	},
];

export default ordersData;
