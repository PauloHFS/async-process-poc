import { PipelineModel } from '@/database/mongodb/models/pipeline.js';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export const getPipelines = async (req: Request, res: Response) => {
  try {
    const pipelines = await PipelineModel.find();
    res.json(pipelines);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createPipeline = async (req: Request, res: Response) => {
  try {
    const pipeline = await PipelineModel.create(req.body);
    res.status(201).json(pipeline);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPipeline = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pipeline = await PipelineModel.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );

    if (!pipeline) {
      return res.status(404).json({ message: 'Pipeline not found' });
    }

    res.json(pipeline);
  } catch (error) {
    next(error);
  }
};
