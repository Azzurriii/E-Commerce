import Queue from 'bull';
import { EmailData } from '@interfaces/mail';

export const emailQueue = new Queue<EmailData>('emailQueue', {
	redis: process.env.REDIS_URL,
});
