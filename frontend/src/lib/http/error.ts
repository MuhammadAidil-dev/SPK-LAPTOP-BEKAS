// ────────────────────────────────────────────────
// Error normalizer
// ────────────────────────────────────────────────

import axios, { AxiosError } from 'axios';
import { ApiError } from './types';

export const normalizeError = (err: unknown): ApiError => {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError<{
      message?: string;
      errors?: Record<string, string[]>;
      code?: string;
    }>;
    const status = axiosErr.response?.status ?? 0;
    const body = axiosErr.response?.data;

    // Tidak ada response (network / timeout)
    if (!axiosErr.response) {
      return {
        status: 0,
        message:
          axiosErr.code === 'ECONNABORTED'
            ? 'Request timeout.'
            : 'Tidak dapat terhubung ke server.',
        code: axiosErr.code,
      };
    }

    return {
      status,
      message: body?.message ?? axiosErr.message ?? 'Terjadi kesalahan.',
      errors: body?.errors,
      code: body?.code,
    };
  }

  // Error non-axios
  return {
    status: 500,
    message: err instanceof Error ? err.message : 'Kesalahan tidak diketahui.',
  };
};
