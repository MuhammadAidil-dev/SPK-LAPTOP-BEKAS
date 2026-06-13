import { NextFunction, Request, Response } from 'express';
import { loadEnv } from '../config/env';
import { AppError } from '@/common/error/appError';
import { ERROR_CODE, ErrorCode, HTTP_CODE } from '@/common/error/http';
import { sendError } from '@/common/response/response.helper';

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
  _req: Request,
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

  if (env.NODE_ENV === 'development') {
    console.error('ERROR:', err);
  }

  sendError(res, {
    statusCode,
    message,
    code,
    ...(env.NODE_ENV === 'development' && hasStack(err) && {
      errors: { stack: err.stack },
    }),
  });
};
