import dotenv from 'dotenv';
import zod from 'zod';

dotenv.config();

const envSchema = zod.object({
  PORT: zod.string().readonly().default('8080'),
  REDIS_URL: zod.string().readonly().default('redis://localhost:6379'),
  MONGO_URL: zod.string().readonly().default('mongodb://localhost:27017'),
});

export const env = envSchema.parse(process.env);
