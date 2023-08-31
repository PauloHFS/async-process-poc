import mongoose from 'mongoose';
import { env } from '../config/env.js';

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
};
