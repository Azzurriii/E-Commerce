import redisClient from '@configs/redis';

/**
 * Save data to Redis with expiration time
 * @param key Key (data name)
 * @param value Value (JSON string)
 * @param expiration Expiration time (in seconds)
 */
export const setCache = async (key: string, value: any, expiration = 3600) => {
	await redisClient.setEx(key, expiration, JSON.stringify(value));
	console.log(`✅ Data cached: ${key}`);
};

/**
 * Get data from Redis
 * @param key Key (data name)
 */
export const getCache = async (key: string): Promise<any | null> => {
	const data = await redisClient.get(key);
	console.log(`🔍 Getting cache for ${key}:`, data);
	return data ? JSON.parse(data) : null;
};

/**
 * Delete data from Redis
 * @param key Key (data name)
 */
export const deleteCache = async (key: string) => {
	await redisClient.del(key);
	console.log(`🗑 Deleted cache: ${key}`);
};
