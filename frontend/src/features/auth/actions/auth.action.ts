'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginSchema } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';

export type AuthActionState = { error: string } | null;

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const result = await authService.login(parsed.data);
  if (!result.success) {
    return { error: result.error.message };
  }

  const cookieStore = await cookies();
  cookieStore.set('accessToken', result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  redirect('/dashboard');
}

export async function logoutAction(): Promise<void> {
  await authService.logout();

  const cookieStore = await cookies();
  cookieStore.delete('accessToken');

  redirect('/auth/login');
}
