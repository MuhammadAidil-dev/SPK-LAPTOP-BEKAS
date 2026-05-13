import { AppError } from '@/common/error/appError';
import { userRepository } from '../users/user.repository';
import { TLoginPayload } from './auth.type';
import { ERROR_CODE, HTTP_CODE } from '@/common/error/http';
import jwt, { SignOptions } from 'jsonwebtoken';
import { IUserDocument, IUserResponse } from '../users/user.type';
import { loadEnv } from '@/config/env';

const env = loadEnv();

type TLoginResult = {
  accessToken: string;
  user: IUserResponse;
};

class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRED_IN: SignOptions['expiresIn'];

  constructor() {
    if (!env.JWT_SECRET_KEY) {
      throw Error('JWT Secret tidak ditemukan di env variable');
    }

    this.JWT_SECRET = env.JWT_SECRET_KEY;
    this.JWT_EXPIRED_IN = (env.JWT_EXPIRES_IN ??
      '8h') as SignOptions['expiresIn'];
  }

  async loginService(payload: TLoginPayload): Promise<TLoginResult> {
    const { email, password } = payload;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Data user tidak ditemukan',
        HTTP_CODE.NOT_FOUND,
        ERROR_CODE.NOT_FOUND,
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new AppError(
        'Invalid Credential',
        HTTP_CODE.UNAUTHORIZED,
        ERROR_CODE.UNAUTHORIZED,
      );
    }

    // generate token
    const token = this.generateToken(user);

    // hilangkan password di user

    const { password: _pw, ...filteredUser } = user.toObject();

    return {
      accessToken: token,
      user: filteredUser,
    };
  }

  private generateToken(user: IUserDocument): string {
    return jwt.sign(
      {
        sub: user._id,
        email: user.email,
        role: user.role,
      },
      this.JWT_SECRET,
      {
        expiresIn: this.JWT_EXPIRED_IN,
      },
    );
  }
}

export const authService = new AuthService();
