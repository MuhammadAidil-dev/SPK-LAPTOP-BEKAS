import mongoose from 'mongoose';
import { loadEnv } from './env';
import { logger } from './logger';

export const connectDb = async (): Promise<void> => {
  const env = loadEnv();
  try {
    const uri = env.MONGO_URI;
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
