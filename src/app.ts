import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectToMongoDB } from './database/mongodb.js';
import { redisClient } from './database/redis.js';
import { appRouter } from './router.js';

const app = express();

await connectToMongoDB();

app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());

app.use(appRouter);

app.get('/', async (req, res) => {
  try {
    const count = await redisClient.incr('count');
    res.send(`Count: ${count}`);
  } catch (error) {
    res.send("Couldn't increment count");
  }
});

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
