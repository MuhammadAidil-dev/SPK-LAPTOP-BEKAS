import { Router } from 'express';
import { asyncHandler } from '@/middleware/asyncHandler';
import { validate } from '@/middleware/validate';
import { compareSchema } from './calculation.validation';
import { calculationController } from './calculation.controller';

const calculationRouter = Router();

/**
 * @access PUBLIC
 * @method GET
 */
calculationRouter.get(
  '/',
  asyncHandler(calculationController.calculateSmartController),
);

/**
 * @access PUBLIC
 * @method POST
 */
calculationRouter.post(
  '/compare',
  validate(compareSchema),
  asyncHandler(calculationController.compareController),
);

export default calculationRouter;
