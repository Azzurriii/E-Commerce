import mongoose from 'mongoose';
const mongoURI = process.env.DB_URL ?? '';
class Database {
	private static instance: Database;

	constructor() {
		this.connect();
	}

	private connect(type = 'mongodb') {
		if (1 === 1) {
			mongoose.set('debug', true);
			mongoose.set('debug', { color: true });
		}
		mongoose
			.connect(mongoURI)
			.then(() => {
				console.info('✅ Connected to MongoDB');
			})
			.catch((error) => {
				console.error('Error connecting to MongoDB:', error);
			});
	}

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}
}

const db = Database.getInstance();
export default db;
