import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'dev';

// Thiết lập đường dẫn tới file .env tương ứng với môi trường
const envFile = path.resolve(__dirname, `../../env/.${env}.env`);

dotenv.config({ path: envFile });

console.info(`✅ Loaded environment variables from ${envFile}`);
