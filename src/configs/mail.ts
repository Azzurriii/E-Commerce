import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST || 'smtp.gmail.com',
	port: Number(process.env.EMAIL_PORT) || 465,
	secure: true,
	service: process.env.EMAIL_SERVICE || 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Verify connection configuration
let isEmailConfigured = false;

const verifyTransporter = async () => {
	try {
		await transporter.verify();
		console.log('✅ SMTP server connection established');
		isEmailConfigured = true;
		return true;
	} catch (error) {
		console.error('❌ SMTP server connection error:', error);
		isEmailConfigured = false;
		return false;
	}
};

// Khởi tạo verify nhưng không block
verifyTransporter();

export const getTransporter = () => {
	if (!isEmailConfigured) {
		console.warn('⚠️ Email service not configured properly');
	}
	return transporter;
};

export default transporter;
