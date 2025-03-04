export const RoleUser = {
	USER: 'USER',
	COMPANY: 'COMPANY',
	ADMIN: 'ADMIN',
	SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const UserStatus = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
} as const;

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
