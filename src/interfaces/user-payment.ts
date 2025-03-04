export interface ICreateUserPayment {
	user_id: string;
	payment_type: string; // 'card', 'bank_account', etc.
	provider: string; // 'visa', 'mastercard', 'amex', etc.
	account_no: string; // Chỉ lưu 4 số cuối của thẻ
	expiry: string;
	stripe_payment_method_id: string; // ID của payment method từ Stripe
	is_default: boolean;
	card_brand?: string; // Thương hiệu thẻ
	card_holder_name?: string; // Tên chủ thẻ
}

export interface IUpdateUserPayment {
	payment_type?: string;
	provider?: string;
	account_no?: string;
	expiry?: string;
	stripe_payment_method_id?: string;
	is_default?: boolean;
	card_brand?: string;
	card_holder_name?: string;
}

export interface IStripePaymentMethodResponse {
	id: string;
	object: string;
	card: {
		brand: string;
		exp_month: number;
		exp_year: number;
		last4: string;
	};
	customer: string;
	type: string;
}
