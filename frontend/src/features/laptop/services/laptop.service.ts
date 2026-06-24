import { publicApi } from '@/lib/http/client';
import { privateApi } from '@/lib/http/client-server';
import { ILaptop } from '@/types/laptop.type';

export const laptopService = {
  getAll: () => publicApi.get<ILaptop[]>('/laptops'),

  getById: (id: string) => publicApi.get<ILaptop>(`/laptops/${id}`),

  create: (data: FormData) =>
    privateApi.postFormData<ILaptop>('/laptops/create', data),

  update: (id: string, data: FormData) =>
    privateApi.patchFormData<ILaptop>(`/laptops/update/${id}`, data),

  delete: (id: string) =>
    privateApi.delete<ILaptop>(`/laptops/delete/${id}`),
};
