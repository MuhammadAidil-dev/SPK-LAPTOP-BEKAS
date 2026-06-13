import { NextFunction, Request, Response } from 'express';
import { loadEnv } from '../config/env';
import { AppError } from '@/common/error/appError';
import { ERROR_CODE, ErrorCode, HTTP_CODE } from '@/common/error/http';
import { sendError } from '@/common/response/response.helper';
import { logger } from '@/config/logger';

const env = loadEnv();

const hasNumericCode = (error: unknown): error is { code: number } =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof (error as { code: unknown }).code === 'number';

const hasStack = (error: unknown): error is { stack: string } =>
  typeof error === 'object' &&
  error !== null &&
  'stack' in error &&
  typeof (error as { stack: unknown }).stack === 'string';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode: number = HTTP_CODE.INTERNAL_SERVER;
  let message = 'Internal Server Error';
  let code: ErrorCode = ERROR_CODE.INTERNAL_ERROR;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
  } else if (hasNumericCode(err) && err.code === 11000) {
    statusCode = HTTP_CODE.CONFLICT;
    message = 'Data sudah ada, tidak boleh duplikat';
    code = ERROR_CODE.DUPLICATE_KEY;
  }

  const logMeta = {
    method: req.method,
    path: req.path,
    statusCode,
    code,
    ...(hasStack(err) && { stack: (err as { stack: string }).stack }),
  };

  if (statusCode >= 500) {
    logger.error(message, logMeta);
  } else if (statusCode >= 400) {
    logger.warn(message, logMeta);
  }

  sendError(res, {
    statusCode,
    message,
    code,
    ...(env.NODE_ENV === 'development' && hasStack(err) && {
      errors: { stack: (err as { stack: string }).stack },
    }),
  });
};
