import { privateApi, publicApi } from '@/lib/http/client';
import { ILaptop } from '@/types/laptop.type';

export const laptopService = {
  getAll: () => publicApi.get<ILaptop[]>('/laptops'),

  getById: (id: string) => publicApi.get<ILaptop>(`/laptops/${id}`),

  create: (data: FormData) =>
    privateApi.post<ILaptop>('/laptops/create', data),

  update: (id: string, data: FormData) =>
    privateApi.patch<ILaptop>(`/laptops/update/${id}`, data),

  delete: (id: string) =>
    privateApi.delete<ILaptop>(`/laptops/delete/${id}`),
};
