import morgan from 'morgan';
import { StreamOptions } from 'morgan';
import { logger } from '@/config/logger';

const stream: StreamOptions = {
  write: (message: string) => {
    // Morgan menambah newline di akhir — trim dulu
    logger.http(message.trim());
  },
};

const skip = () => process.env.NODE_ENV === 'test';

// format ringkas: METHOD /path STATUS ms - bytes
const format =
  process.env.NODE_ENV === 'development'
    ? 'dev'
    : ':method :url :status :res[content-length]B - :response-time ms';

export const httpLogger = morgan(format, { stream, skip });
