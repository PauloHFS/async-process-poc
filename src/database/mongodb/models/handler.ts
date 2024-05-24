import { Schema, model } from 'mongoose';

export interface Handler {
  slug: string;
  active: boolean;
}

const handlerSchema = new Schema<Handler>(
  {
    slug: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HandlerModel = model<Handler>('Handler', handlerSchema);
