import { asyncHandler } from '@/middleware/asyncHandler';
import { Router } from 'express';
import { criteriaController } from './criteria.controller';
import { validate } from '@/middleware/validate';
import {
  CreateCriteriaSchema,
  UpdateCriteriaSchema,
} from './criteria.validation';
import { authenticate } from '@/middleware/authenticate';
import { authorize } from '@/middleware/authorize';

const criteriaRouter = Router();

/**
 * @access PUBLIC
 * @method GET
 */
criteriaRouter.get(
  '/',
  asyncHandler(criteriaController.getAllCriteriaController),
);

/**
 * @access PRIVATE (admin only)
 */

criteriaRouter.post(
  '/create',
  validate(CreateCriteriaSchema),
  authenticate,
  authorize('admin'),
  asyncHandler(criteriaController.createCriteriaController),
);

criteriaRouter.patch(
  '/update/:id',
  validate(UpdateCriteriaSchema),
  authenticate,
  authorize('admin'),
  asyncHandler(criteriaController.updateCriteriaController),
);

criteriaRouter.delete(
  '/delete/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(criteriaController.deleteCriteriaController),
);

export default criteriaRouter;
