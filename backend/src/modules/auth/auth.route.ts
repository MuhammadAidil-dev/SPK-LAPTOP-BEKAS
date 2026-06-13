import { asyncHandler } from '@/middleware/asyncHandler';
import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '@/middleware/validate';
import { LoginSchema } from './auth.validation';

const auhtRouter = Router();

auhtRouter.post(
  '/login',
  validate(LoginSchema),
  asyncHandler(authController.loginController),
);

auhtRouter.post('/logout', asyncHandler(authController.logoutController));

export default auhtRouter;
