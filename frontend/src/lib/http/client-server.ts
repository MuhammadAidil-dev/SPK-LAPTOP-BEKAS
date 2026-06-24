import { cookies } from 'next/headers';
import { createInstance, formDataRequest, request, BASE_URL } from './client';
import { AxiosRequestConfig } from 'axios';
import { Result } from './types';

const TOKEN_COOKIE_KEY = 'accessToken';

const tokenGetter = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_KEY)?.value;
};

const privateInstance = createInstance(tokenGetter);

export const privateApi = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'GET', url }),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'POST', url, data }),

  postFormData: <T>(url: string, data: FormData) =>
    formDataRequest<T>('POST', url, data, tokenGetter),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'PUT', url, data }),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'PATCH', url, data }),

  patchFormData: <T>(url: string, data: FormData) =>
    formDataRequest<T>('PATCH', url, data, tokenGetter),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'DELETE', url }),
};
