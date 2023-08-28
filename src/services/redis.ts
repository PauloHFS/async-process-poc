import { createClient } from 'redis';
import { env } from '../env.js';

const client = createClient({
  url: env.REDIS_URL,
});

client.on('error', err => {
  console.error('Redis Client Error', err);
});

await client.connect();

export const redisClient = client;
