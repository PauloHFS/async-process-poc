import { HandlerModel } from '@/database/mongodb/models/handler.js';
import { Handler } from './Handler.js';

/**
 * HandlerManager
 *
 */
export class HandlerManager {
  #ready: boolean;
  handlers: Map<string, Handler>;

  constructor() {
    this.#ready = false;
    this.handlers = new Map();
  }

  /**
   * Add a handler to the manager
   *
   * @param handler
   */
  addHandler(handler: Handler) {
    this.handlers.set(handler.slug, handler);
  }

  async getActiveHandlers() {
    await this.#updateHandlers();
    return Array.from(this.handlers.values()).filter(handler => handler.active);
  }

  async process(pipeline: string[], data: any) {
    let result = undefined;

    for (const slug of pipeline) {
      const handler = this.handlers.get(slug);

      if (handler && handler.active) {
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

  async init() {
    this.#ready = true;
    try {
      const promises = Array.from(this.handlers.values()).map(handler =>
        handler.instantiate()
      );
      const results = await Promise.allSettled(promises);

      for (const result of results) {
        if (result.status === 'rejected') {
          console.error(`Failed to instantiate handler: ${result.reason}`);
        }
      }
    } catch (error) {
      console.error(`Failed to instantiate handlers: ${error}`);
    }
  }

  async #updateHandlers() {
    try {
      const handlersDb = await HandlerModel.find();

      for (const handler of handlersDb) {
        const handlerInstance = this.handlers.get(handler.slug);
        if (handlerInstance) {
          handlerInstance.active = handler.active;
        }
      }
    } catch (error) {}
  }
}

const handlerManager = new HandlerManager();

export { handlerManager };
