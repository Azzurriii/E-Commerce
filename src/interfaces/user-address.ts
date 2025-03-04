export interface ICreateUserAddress {
	user_id: string;
	address_line1: string;
	address_line2: string;
	city: string;
	postal_code: string;
	country: string;
	telephone: string;
	mobile: string;
}

export interface IUpdateUserAddress {
	address_line1: string;
	address_line2: string;
	city: string;
	postal_code: string;
	country: string;
	telephone: string;
	mobile: string;
}
