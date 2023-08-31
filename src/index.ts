import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { connectToMongoDB } from './database/mongodb.js';
import { PipelineRouter } from './modules/pipelines/index.js';
import { redisClient } from './services/redis.js';

const app = express();

connectToMongoDB();

app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());

app.use('/pipeline', PipelineRouter);

app.get('/', async (req, res) => {
  try {
    const count = await redisClient.incr('count');
    res.send(`Count: ${count}`);
  } catch (error) {
    res.send("Couldn't increment count");
  }
});

app.listen(env.PORT, () => {
  console.log(`Server Running at http://localhost:${env.PORT}`);
});
