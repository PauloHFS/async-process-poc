import { Schema, model } from 'mongoose';

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
