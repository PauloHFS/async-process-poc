import mongoose from 'mongoose';
import { env } from '../config/env.js';

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log('MongoDB - Connected');
  } catch (error) {
    console.error('MongoDB - Error', error);
  }
};
