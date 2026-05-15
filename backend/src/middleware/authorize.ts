import { AppError } from '@/common/error/appError';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';
import { NextFunction, Request, Response } from 'express';

export const authorize = (...validRole: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!validRole.includes(user.role)) {
      throw new AppError(
        'Tidak diberikan akses',
        HTTP_CODE.FORBIDDEN,
        ERROR_CODE.FORBIDDEN,
      );
    }
    next();
  };
};
