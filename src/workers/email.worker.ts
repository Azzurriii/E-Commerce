import '@configs/env';
import { emailQueue } from '@queues/email.queue';
import { emailService } from '@services/mail.service';

console.log('✅ Mail worker is running...');

emailQueue.process(async (job) => {
	const { to, template, subject, data } = job.data;

	await emailService.sendMail({
		to,
		template,
		subject,
		data,
	});

	return { success: true };
});

emailQueue.on('completed', (job, result) => {
	console.log(`✅ Job ${job.id} completed! Result:`, result);
});

emailQueue.on('failed', (job, err) => {
	console.log(`❌ Job ${job.id} failed! Error:`, err);
});
