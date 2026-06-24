import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { normalizeError } from './error';
import { ApiResponse, ApiError, Result } from './types';
import { loadEnvPublic } from '@/constant/env.constan';

const ENV_PUBLIC = loadEnvPublic();
const BASE_URL = ENV_PUBLIC.BASE_URL;

function createInstance(tokenGetter?: () => Promise<string | undefined>): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15_000,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(async (config) => {
    if (tokenGetter) {
      const token = await tokenGetter();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  });

  return instance;
}

const publicInstance = createInstance();

async function formDataRequest<T>(
  method: string,
  url: string,
  data: FormData,
  tokenGetter?: () => Promise<string | undefined>,
): Promise<Result<T>> {
  try {
    const token = tokenGetter ? await tokenGetter() : undefined;
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${url}`, { method, headers, body: data });
    const json: ApiResponse<T> = await res.json();

    if (!json.success) {
      const err: ApiError = { status: res.status, message: json.message };
      return { success: false, error: err };
    }

    return { success: true, data: json.data };
  } catch (err) {
    return { success: false, error: normalizeError(err) };
  }
}

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

export const publicApi = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(publicInstance, { ...config, method: 'GET', url }),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(publicInstance, { ...config, method: 'POST', url, data }),
};

export { createInstance, formDataRequest, request, BASE_URL };
