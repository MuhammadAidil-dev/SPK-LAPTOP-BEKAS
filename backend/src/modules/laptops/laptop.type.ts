import { Document } from 'mongoose';

export interface ILaptop {
  name: string;
  brand: string;
  price: number;
  processor_score: number;
  gpu_score: number;
  ram: number;
  storage: number;
  condition: number;
  age_months: number;
  screen_size: number;
  battery_life: number;
  image?: string;
  isActive: boolean;
}

export interface ILaptopDocument extends ILaptop, Document {}

export type ILaptopResponse = ILaptop & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateLaptopDTO = Omit<ILaptop, 'isActive'>;
export type UpdateLaptopDTO = Partial<CreateLaptopDTO & { isActive: boolean }>;
