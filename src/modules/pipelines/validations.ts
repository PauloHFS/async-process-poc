import { PipelineModel } from '@/database/mongodb/models/pipeline.js';
import zod from 'zod';

export const createPipelineSchema = zod.object({
  body: zod.object({
    name: zod
      .string({
        required_error: 'Name is required',
      })
      .min(3)
      .max(255),
    description: zod
      .string({
        required_error: 'Description is required',
      })
      .min(3)
      .max(255)
      .optional(),
    stages: zod
      .array(zod.string(), {
        required_error: 'Stages is required',
      })
      .min(1)
      .max(255),
  }),
});

export const getPipelineSchema = zod.object({
  params: zod.object({
    id: zod
      .string({
        required_error: 'Id is required',
      })
      .refine(
        async id => {
          const exists = await PipelineModel.exists({ _id: id });
          return exists;
        },
        {
          message: 'Pipeline not found',
        }
      ),
  }),
});
