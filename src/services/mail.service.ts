import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import transporter from '@configs/mail';
import { EmailTemplate, EMAIL_SUBJECTS } from '@constants/mail';
import { EmailData } from '@interfaces/mail';
class EmailService {
	private templates: Map<EmailTemplate, HandlebarsTemplateDelegate> = new Map();

	constructor() {
		this.loadTemplates();
	}

	private async loadTemplates() {
		for (const template of Object.values(EmailTemplate)) {
			const templatePath = path.join(__dirname, `../templates/emails/${template}.hbs`);
			const templateContent = await fs.readFile(templatePath, 'utf-8');
			this.templates.set(template, Handlebars.compile(templateContent));
		}
	}

	async sendMail({ to, template, subject, data }: EmailData): Promise<void> {
		const templateFn = this.templates.get(template);
		if (!templateFn) {
			throw new Error(`Template ${template} not found`);
		}

		const mailData = {
			from: process.env.EMAIL_USER,
			to,
			subject: subject || EMAIL_SUBJECTS[template],
			html: templateFn(data || {}),
		};

		return new Promise((resolve, reject) => {
			transporter.sendMail(mailData, (err: any, info: any) => {
				if (err) {
					console.error('Error sending email:', err);
					reject(err);
				} else {
					console.log('Email sent successfully:', info.messageId);
					resolve(info);
				}
			});
		});
	}
}

export const emailService = new EmailService();
