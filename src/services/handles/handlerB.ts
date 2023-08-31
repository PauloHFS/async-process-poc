import { randomResponseTime } from '../../utils/randomResponseTime.js';
import { Handler } from './index.js';

const ERROR_RATE = 0.5; // 50% of the time, this handler will fail

const handlerB = new Handler('handlerB', (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > ERROR_RATE) {
        reject(new Error('Random Error'));
      }

      resolve(data);
    }, randomResponseTime(100, 2000));
  });
});

export { handlerB };
