import { handlerManager } from './HandlerManager.js';
import { handlerA } from './handlerA.js';
import { handlerB } from './handlerB.js';

export const setupManager = async () => {
  handlerManager.addHandler(handlerA);
  handlerManager.addHandler(handlerB);
  await handlerManager.init();
};
