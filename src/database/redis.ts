import { createClient } from 'redis';
import { env } from '../config/env.js';

const client = createClient({
  url: env.REDIS_URL,
});

client.on('connect', () => {
  console.log('Redis Client Connected');
});

client.on('error', err => {
  console.error('Redis Client Error', err);
});

await client.connect();

export const redisClient = client;
