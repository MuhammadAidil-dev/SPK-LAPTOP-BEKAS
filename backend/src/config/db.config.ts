import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from './logger';

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}`, override: false });

export const connectDb = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;
  try {
    if (!uri) {
      throw new Error('MONGO_URI must be defined in environment');
    }

    logger.info('Connecting to MongoDB...');

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error', { error });
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info('MongoDB connection closed');
};
