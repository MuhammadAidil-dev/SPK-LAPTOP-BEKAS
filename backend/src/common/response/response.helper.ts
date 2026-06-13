import { Response } from 'express';
import { HTTP_CODE, ErrorCode } from '@/common/error/http';
import { ApiSuccess, ApiError, TMeta } from '@/types/response.type';

export function sendSuccess<T>(
  res: Response,
  options: {
    statusCode?: number;
    message: string;
    data?: T | null;
    meta?: TMeta | null;
  },
): void {
  const body: ApiSuccess<T> = {
    success: true,
    message: options.message,
    data: options.data ?? null,
    meta: options.meta ?? null,
  };

  res.status(options.statusCode ?? HTTP_CODE.OK).json(body);
}

export function sendError(
  res: Response,
  options: {
    statusCode?: number;
    message: string;
    code: string;
    errors?: Record<string, string> | null;
  },
): void {
  const body: ApiError = {
    success: false,
    message: options.message,
    code: options.code,
    errors: options.errors ?? null,
  };

  res.status(options.statusCode ?? HTTP_CODE.INTERNAL_SERVER).json(body);
}
