const RoleUser = {
	USER: 'USER',
	COMPANY: 'COMPANY',
	ADMIN: 'ADMIN',
	SUPER_ADMIN: 'SUPER_ADMIN',
};

const UserStatus = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
};

export interface ISignUp {
	name: string;
	email: string;
	password: string;
	role: string;
}

export default {
	RoleUser,
	UserStatus,
};
