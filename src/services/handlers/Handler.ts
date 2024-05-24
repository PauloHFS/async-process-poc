import {
  HandlerModel,
  Handler as IHandler,
} from '@/database/mongodb/models/handler.js';

export class Handler implements IHandler {
  slug: string;
  #handler: Function;
  active: boolean;

  /**
   * Create a new handler
   *
   * @param slug String identifier for the handler
   * @param handler
   */
  constructor(slug: string, handler: Function) {
    this.slug = slug;
    this.#handler = handler;
    this.active = false;
  }

  async instantiate() {
    try {
      let handler = await HandlerModel.findOne({ slug: this.slug });
      if (!handler) {
        handler = new HandlerModel({ slug: this.slug });
        await handler.save();
      }
      this.active = handler.active;
      return this;
    } catch (error) {
      console.error(`Failed to instantiate handler: ${error}`);
      this.active = false;
    }
  }

  /**
   * Process data using the handler
   *
   * @param data
   */
  async process(data: any) {
    return await this.#handler(data);
  }
}
