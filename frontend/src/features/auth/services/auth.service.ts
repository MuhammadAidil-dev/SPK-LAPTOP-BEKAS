import { publicApi } from '@/lib/http/client';
import { LoginDTO } from '../schemas/auth.schema';

export type LoginResponse = {
  accessToken: string;
  user: { email: string; role: string };
};

export const authService = {
  login: (data: LoginDTO) =>
    publicApi.post<LoginResponse>('/auth/login', data),

  logout: () => publicApi.post<null>('/auth/logout'),
};
