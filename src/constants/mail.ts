export enum EmailTemplate {
	VERIFY_EMAIL = 'verify-email',
	RESET_PASSWORD = 'reset-password',
	WELCOME = 'welcome',
}

export const EMAIL_SUBJECTS = {
	[EmailTemplate.VERIFY_EMAIL]: 'Verify Your Email',
	[EmailTemplate.RESET_PASSWORD]: 'Reset Your Password',
	[EmailTemplate.WELCOME]: 'Welcome to Shopify',
};
