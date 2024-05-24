import { Router } from 'express';
import { PipelineRouter } from './modules/pipelines/routes.js';
const appRouter = Router();
appRouter.use('/pipeline', PipelineRouter);
export { appRouter };
