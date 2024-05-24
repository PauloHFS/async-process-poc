import { validateZodSchema } from '@/middlewares/validateZodSchema.js';
import express from 'express';
import { createPipeline, getPipeline, getPipelines } from './controller.js';
import { createPipelineSchema, getPipelineSchema } from './validations.js';

const PipelineRouter = express.Router();

PipelineRouter.get('/', getPipelines);

PipelineRouter.post(
  '/',
  validateZodSchema(createPipelineSchema),
  createPipeline
);

PipelineRouter.get('/:id', validateZodSchema(getPipelineSchema), getPipeline);

export { PipelineRouter };
