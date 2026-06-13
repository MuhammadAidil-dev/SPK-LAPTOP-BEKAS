import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { normalizeError } from './error';
import { ApiResponse, Result } from './types';
import { loadEnvPublic } from '@/constant/env.constan';

const ENV_PUBLIC = loadEnvPublic();

const BASE_URL = ENV_PUBLIC.BASE_URL;
const TOKEN_COOKIE_KEY = 'accessToken';

// ────────────────────────────────────────────────
// Factory: buat instance dengan/tanpa token
// ────────────────────────────────────────────────

function createInstance(withToken: boolean): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15_000,
    headers: { 'Content-Type': 'application/json' },
  });

  // Request interceptor — inject token jika diperlukan
  instance.interceptors.request.use(async (config) => {
    if (withToken) {
      const cookieStore = await cookies();
      const token = cookieStore.get(TOKEN_COOKIE_KEY)?.value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  return instance;
}

// Instance publik (tanpa token) & privat (dengan token)
const publicInstance = createInstance(false);
const privateInstance = createInstance(true);

// ────────────────────────────────────────────────
// Generic request handler — mengembalikan Result<T>
// ────────────────────────────────────────────────

async function request<T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
): Promise<Result<T>> {
  try {
    const response = await instance.request<ApiResponse<T>>(config);
    return { success: true, data: response.data.data };
  } catch (err) {
    return { success: false, error: normalizeError(err) };
  }
}

// ────────────────────────────────────────────────
// Public API — tanpa token (untuk endpoint publik)
// ────────────────────────────────────────────────

export const publicApi = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(publicInstance, { ...config, method: 'GET', url }),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(publicInstance, { ...config, method: 'POST', url, data }),
};

// ────────────────────────────────────────────────
// Private API — dengan token dari cookies
// ────────────────────────────────────────────────

export const privateApi = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'GET', url }),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'POST', url, data }),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'PUT', url, data }),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'PATCH', url, data }),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(privateInstance, { ...config, method: 'DELETE', url }),
};
