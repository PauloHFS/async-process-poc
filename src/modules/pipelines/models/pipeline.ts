import { Schema, model } from 'mongoose';

// TODO validate if use a zod schema is a good idea here
interface Pipeline {
  name: string;
  description: string;
  stages: string[];
}

const pipelineSchema = new Schema<Pipeline>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    stages: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PipelineModel = model<Pipeline>('Pipeline', pipelineSchema);
