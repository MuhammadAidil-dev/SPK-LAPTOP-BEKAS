import { Request, Response } from 'express';
import { TLoginPayload } from './auth.type';
import { authService } from './auth.service';
import { IUserResponse } from '../users/user.type';
import { HTTP_CODE } from '@/common/error/http';
import { sendSuccess } from '@/common/response/response.helper';

const COOKIE_NAME = 'accessToken';
const eightHours = 8 * 60 * 60 * 1000;
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none' as const,
  maxAge: eightHours,
  path: '/',
};

type TLoginResult = {
  accessToken: string;
  user: IUserResponse;
};

class AuthController {
  async loginController(_req: Request, res: Response) {
    const payload = res.locals.body as TLoginPayload;

    const { accessToken, user } = await authService.loginService(payload);

    res.cookie(COOKIE_NAME, accessToken, cookieOptions);

    sendSuccess<TLoginResult>(res, {
      statusCode: HTTP_CODE.OK,
      message: 'Berhasil login',
      data: { accessToken, user },
    });
  }

  async logoutController(_req: Request, res: Response) {
    res.clearCookie(COOKIE_NAME, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
    });

    sendSuccess(res, {
      statusCode: HTTP_CODE.OK,
      message: 'Berhasil logout',
    });
  }
}

export const authController = new AuthController();
