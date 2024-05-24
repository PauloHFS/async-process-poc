import { randomResponseTime } from '@/utils/randomResponseTime.js';
import { Handler } from './Handler.js';

const ERROR_RATE = 0.1; // 10% of the time, this handler will fail

const handlerA = new Handler('handlerA', (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > ERROR_RATE) {
        reject(new Error('Random Error'));
      }

      resolve(data);
    }, randomResponseTime(500, 5000));
  });
});

export { handlerA };
