import { emailQueue } from '@queues/email.queue';
import { Request, Response } from 'express';

export const sendEmailController = async (req: Request, res: Response) => {
	const { to, template, subject, data } = req.body;

	await emailQueue.add({ to, template, subject, data });

	res.json({ message: 'Email job added to queue' });
};
