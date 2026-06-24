import { publicApi } from '@/lib/http/client';
import { ICalculationResult } from '@/types/calculation.type';

export const calculationService = {
  calculate: () => publicApi.get<ICalculationResult>('/calculation'),
  compare: (laptopIds: string[]) =>
    publicApi.post<ICalculationResult>('/calculation/compare', { laptop_ids: laptopIds }),
};
