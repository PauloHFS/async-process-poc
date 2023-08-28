import express from 'express';
import { env } from './env';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(env.PORT, () => {
  console.log(`Example app listening at http://localhost:${env.PORT}`);
});
