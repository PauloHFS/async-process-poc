export class Handler {
  slug: string;
  handler: Function;

  constructor(slug: string, handler: Function) {
    this.slug = slug;
    this.handler = handler;
  }

  async process(data: any) {
    return await this.handler(data);
  }
}

export class HandlerManager {
  handlers: Map<string, Handler>;

  constructor() {
    this.handlers = new Map();
  }

  addHandler(slug: string, handler: Handler) {
    this.handlers.set(slug, handler);
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
