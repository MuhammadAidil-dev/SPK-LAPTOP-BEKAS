import { Router, NextFunction, Request, Response } from 'express';
import { authenticate } from '@/middleware/authenticate';
import { authorize } from '@/middleware/authorize';
import { imageUpload } from '@/config/multer.config';
import { uploadController } from './upload.controller';
import { AppError } from '@/common/error/appError';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';

const uploadRouter = Router();

/**
 * @access PRIVATE (admin only)
 * @method POST
 * @body multipart/form-data — field: "image"
 */
uploadRouter.post(
  '/image',
  authenticate,
  authorize('admin'),
  (req: Request, res: Response, next: NextFunction) => {
    imageUpload.single('image')(req, res, (err) => {
      if (err) {
        return next(
          new AppError(
            err.message ?? 'Upload gagal',
            HTTP_CODE.BAD_REQUEST,
            ERROR_CODE.BAD_REQUEST,
          ),
        );
      }
      next();
    });
  },
  uploadController.uploadImageController,
);

export default uploadRouter;
