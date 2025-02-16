import { createClient, RedisClientType } from 'redis';

const redisClient: RedisClientType = createClient({
	url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('❌ Redis Error:', err));
redisClient.on('connect', () => console.log('✅ Connected to Redis!'));

(async () => {
	try {
		await redisClient.connect();
	} catch (error) {
		console.error('❌ Redis Connection Error:', error);
	}
})();

export default redisClient;
