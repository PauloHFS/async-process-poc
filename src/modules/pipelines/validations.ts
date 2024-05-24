import mongoose from 'mongoose';
import * as z from 'zod';

export const createPipelineSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3)
      .max(255),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(3)
      .max(255)
      .optional(),
    stages: z
      .array(z.string(), {
        required_error: 'Stages is required',
      })
      .min(1)
      .max(255),
  }),
});

export const getPipelineSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
      .superRefine(async (value, ctx) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid id',
            fatal: true,
          });
          return z.NEVER;
        }
      }),
  }),
});
