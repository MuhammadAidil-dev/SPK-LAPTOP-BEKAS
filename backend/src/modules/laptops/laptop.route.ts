import { Router, Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/middleware/asyncHandler';
import { authenticate } from '@/middleware/authenticate';
import { authorize } from '@/middleware/authorize';
import { validate } from '@/middleware/validate';
import { imageUpload } from '@/config/multer.config';
import { AppError } from '@/common/error/appError';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';
import { CreateLaptopSchema, UpdateLaptopSchema } from './laptop.validation';
import { laptopController } from './laptop.controller';

const laptopRouter = Router();

// Wrap multer agar error masuk ke errorMiddleware
const handleImageUpload = (req: Request, res: Response, next: NextFunction) => {
  imageUpload.single('image')(req, res, (err) => {
    if (err) {
      return next(
        new AppError(
          err.message ?? 'Upload gambar gagal',
          HTTP_CODE.BAD_REQUEST,
          ERROR_CODE.BAD_REQUEST,
        ),
      );
    }
    next();
  });
};

/**
 * @access PUBLIC
 */
laptopRouter.get('/', asyncHandler(laptopController.getAllLaptopsController));
laptopRouter.get('/:id', asyncHandler(laptopController.getLaptopByIdController));

/**
 * @access PRIVATE (admin only)
 * @body multipart/form-data
 */
laptopRouter.post(
  '/create',
  handleImageUpload,
  validate(CreateLaptopSchema),
  authenticate,
  authorize('admin'),
  asyncHandler(laptopController.createLaptopController),
);

laptopRouter.patch(
  '/update/:id',
  handleImageUpload,
  validate(UpdateLaptopSchema),
  authenticate,
  authorize('admin'),
  asyncHandler(laptopController.updateLaptopController),
);

laptopRouter.delete(
  '/delete/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(laptopController.deleteLaptopController),
);

export default laptopRouter;
