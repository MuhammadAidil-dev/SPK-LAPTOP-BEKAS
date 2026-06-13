export interface ILaptop {
  _id: string;
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
  image: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LaptopDTO = {
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
};
