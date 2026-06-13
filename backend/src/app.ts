import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import { errorMiddleware } from './middleware/errorMiddleware';
import { loadEnv } from './config/env';
import auhtRouter from './modules/auth/auth.route';
import { AppError } from './common/error/appError';
import { ERROR_CODE, HTTP_CODE } from './common/error/http';
import criteriaRouter from './modules/criteria/criteria.route';
import laptopRouter from './modules/laptops/laptop.route';
import calculationRouter from './modules/calculation/calculation.route';
import uploadRouter from './modules/uploads/upload.route';

const env = loadEnv();

const app: Application = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// route
app.use('/api/v1/auth', auhtRouter);
app.use('/api/v1/criteria', criteriaRouter);
app.use('/api/v1/laptops', laptopRouter);
app.use('/api/v1/calculation', calculationRouter);
app.use('/api/v1/uploads', uploadRouter);

// not found error
app.use((_req, _res, next) => {
  next(
    new AppError(
      'Route not found',
      HTTP_CODE.NOT_FOUND,
      ERROR_CODE.INTERNAL_SERVER,
    ),
  );
});

// global error middleware
app.use(errorMiddleware);
export default app;
