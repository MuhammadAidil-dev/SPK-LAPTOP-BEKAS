import { Request, Response } from 'express';
import { AppError } from '@/common/error/appError';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';
import { sendSuccess } from '@/common/response/response.helper';
import { loadEnv } from '@/config/env';

const env = loadEnv();

class UploadController {
  uploadImageController(req: Request, res: Response) {
    if (!req.file) {
      throw new AppError(
        'File gambar tidak ditemukan',
        HTTP_CODE.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
      );
    }

    const url = `${env.URL}/uploads/${req.file.filename}`;

    sendSuccess<{ url: string }>(res, {
      statusCode: HTTP_CODE.CREATED,
      message: 'Gambar berhasil diupload',
      data: { url },
    });
  }
}

export const uploadController = new UploadController();
