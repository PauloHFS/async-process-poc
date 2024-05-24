import { env } from '@/config/env.js';
import { createClient } from 'redis';

const client = createClient({
  url: env.REDIS_URL,
});

client.on('connect', () => {
  console.log('Redis Client - Connected');
});

client.on('error', err => {
  console.error('Redis Client - Error', err);
});

client.on('end', () => {
  console.log('Redis Client - Disconnected');
});

export { client };
