import { Request, Response } from 'express';
import { AppError } from '@/common/error/appError';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';
import { ApiResponse } from '@/types/api-response.type';
import { loadEnv } from '@/config/env';

const env = loadEnv();

class UploadController {
  uploadImageController(
    req: Request,
    res: Response<ApiResponse<{ url: string }>>,
  ) {
    if (!req.file) {
      throw new AppError(
        'File gambar tidak ditemukan',
        HTTP_CODE.BAD_REQUEST,
        ERROR_CODE.BAD_REQUEST,
      );
    }

    const url = `${env.URL}/uploads/${req.file.filename}`;

    res.status(HTTP_CODE.CREATED).json({
      success: true,
      message: 'Gambar berhasil diupload',
      data: { url },
    });
  }
}

export const uploadController = new UploadController();
