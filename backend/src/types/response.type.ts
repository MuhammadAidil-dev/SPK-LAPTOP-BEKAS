export type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T | null;
  meta: TMeta | null;
};

export type ApiError = {
  success: false;
  message: string;
  code: string;
  errors: Record<string, string> | null;
};

export type ApiResponse<T = null> = ApiSuccess<T> | ApiError;
