import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectToMongoDB } from './database/mongodb.js';
import { client } from './database/redis.js';
import { appRouter } from './router.js';

await connectToMongoDB();
await client.connect();

const app = express();
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());

app.use(appRouter);

app.get('/', async (req, res, next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = JSON.stringify(error);
    res.status(503).send();
  }
});

export { app };
