import { ErrorCode, HTTP_CODE, ERROR_CODE } from './http';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = HTTP_CODE.INTERNAL_SERVER,
    code: ErrorCode = ERROR_CODE.INTERNAL_ERROR,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
