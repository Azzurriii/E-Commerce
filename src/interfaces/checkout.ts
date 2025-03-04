export interface ICreateCheckoutSession {
	user_id: string;
	payment_method_id?: string; // ID phương thức thanh toán đã lưu (nếu có)
	shipping_address_id?: string; // ID địa chỉ giao hàng
}

export interface ICheckoutResponse {
	client_secret: string;
	payment_intent_id: string;
	ephemeral_key?: string;
	customer_id?: string;
}

export interface IConfirmPaymentRequest {
	payment_intent_id: string;
	shipping_address_id?: string;
}

export interface IOrderCreationResult {
	order_id: string;
	order_items: any[];
	payment_details: any;
	total: number;
}
