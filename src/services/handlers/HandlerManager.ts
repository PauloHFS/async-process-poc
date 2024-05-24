import { handlerA } from './handlerA.js';
import { handlerB } from './handlerB.js';
import { Handler } from './index.js';

/**
 * HandlerManager
 *
 */
export class HandlerManager {
  handlers: Map<string, Handler>;

  constructor() {
    this.handlers = new Map();
  }

  /**
   * Add a handler to the manager
   *
   * @param handler
   */
  async addHandler(handler: Handler) {
    try {
      await handler.instantiate();
      this.handlers.set(handler.slug, handler);
    } catch (error) {
      console.error(`Failed to add handler: ${error}`);
    }
  }

  async process(pipeline: string[], data: any) {
    let result = undefined;

    for (const slug of pipeline) {
      const handler = this.handlers.get(slug);

      if (handler) {
        try {
          result = await handler.process(data);
          break;
        } catch (error) {
          console.error(`${slug} handler failed: ${error}}`);
        }
      }
    }

    return result;
  }
}

const handlerManager = new HandlerManager();

handlerManager.addHandler(handlerA);
handlerManager.addHandler(handlerB);

export { handlerManager };
