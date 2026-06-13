import { Router } from 'express';
import { asyncHandler } from '@/middleware/asyncHandler';
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

export default calculationRouter;
