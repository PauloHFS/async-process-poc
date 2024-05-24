import zod from 'zod';

const envSchema = zod.object({
  NODE_ENV: zod
    .enum(['development', 'production'])
    .default('development')
    .readonly(),
  PORT: zod.string().default('8080').readonly(),
  REDIS_URL: zod.string().default('redis://localhost:6379').readonly(),
  MONGO_URL: zod.string().default('mongodb://localhost:27017').readonly(),
});

export const env = envSchema.parse(process.env);
