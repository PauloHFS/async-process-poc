import { connectToMongoDB } from '@/database/mongodb/index.js';
import { client } from '@/database/redis/index.js';
import { appRouter } from '@/router.js';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { handlerManager } from './services/handlers/HandlerManager.js';

await connectToMongoDB();
await client.connect();

const app = express();
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());

app.use(appRouter);

app.get('/handlers', async (req, res) => {
  try {
    const handlers = await handlerManager.handlers;
    res.json(Array.from(handlers.keys()));
  } catch (error) {}
});

app.get('/health', async (req, res, next) => {
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
