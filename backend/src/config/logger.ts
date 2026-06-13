import winston from 'winston';

const { combine, timestamp, colorize, printf, json, errors } = winston.format;

const isDev = process.env.NODE_ENV === 'development';

// Format untuk development: human-readable + berwarna
const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return stack
      ? `[${timestamp}] ${level}: ${message}\n${stack}`
      : `[${timestamp}] ${level}: ${message}`;
  }),
);

// Format untuk production: structured JSON
const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json(),
);

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const logger = winston.createLogger({
  levels,
  level: isDev ? 'debug' : 'info',
  format: isDev ? devFormat : prodFormat,
  defaultMeta: { service: 'spk-laptop-api' },
  transports: [new winston.transports.Console()],
});
