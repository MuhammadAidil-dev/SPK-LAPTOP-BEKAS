import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { sendError } from '@/common/response/response.helper';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.reduce<Record<string, string>>(
        (acc, detail) => {
          const field = detail.path.join('.');
          if (!acc[field]) acc[field] = detail.message;
          return acc;
        },
        {},
      );

      sendError(res, {
        statusCode: HTTP_CODE.UNPROCESSABLE,
        message: 'Validasi gagal',
        code: ERROR_CODE.VALIDATION_ERROR,
        errors,
      });
      return;
    }

    res.locals.body = value;
    next();
  };
};
