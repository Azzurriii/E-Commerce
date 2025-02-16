import { EmailTemplate } from '../constants/mail';

export interface EmailData {
	to: string;
	template: EmailTemplate;
	subject?: string;
	data?: Record<string, any>;
}
