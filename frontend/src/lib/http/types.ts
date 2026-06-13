// ============================================================
// TYPES - api.types.ts
// ============================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta: unknown;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>; // validation errors
  code?: string;
}

// Result type — tidak pakai throw, error dikembalikan sebagai nilai
export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };
