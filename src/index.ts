import { env } from '@/config/env.js';
import { app } from './app.js';

const server = app.listen(env.PORT, () => {
  console.log(`Server Running at http://localhost:${env.PORT}`);
});

if (env.NODE_ENV === 'production') {
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}
