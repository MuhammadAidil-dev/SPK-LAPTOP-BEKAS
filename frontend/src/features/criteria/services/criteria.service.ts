import { privateApi, publicApi } from '@/lib/http/client';
import { ICriteria } from '@/types/criteria.type';

export type CriteriaCreatePayload = { name: string; type: 'benefit' | 'cost'; weight: number };
export type CriteriaUpdatePayload = Partial<CriteriaCreatePayload & { isActive: boolean }>;

export const criteriaService = {
  getAll: () => publicApi.get<ICriteria[]>('/criteria'),

  create: (data: CriteriaCreatePayload) =>
    privateApi.post<ICriteria>('/criteria/create', data),

  update: (id: string, data: CriteriaUpdatePayload) =>
    privateApi.patch<ICriteria>(`/criteria/update/${id}`, data),

  delete: (id: string) =>
    privateApi.delete<ICriteria>(`/criteria/delete/${id}`),
};
