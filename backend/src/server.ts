import app from './app';
import { connectDb } from './config/db.config';
import { loadEnv } from './config/env';
import { logger } from './config/logger';

const startServer = async (): Promise<void> => {
  try {
    const env = loadEnv();

    await connectDb();

    app.listen(env.PORT, () => {
      logger.info(`Server running on ${env.URL}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

// Handle uncaught exceptions & unhandled rejections
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Rejection', { reason });
  process.exit(1);
});

startServer();
