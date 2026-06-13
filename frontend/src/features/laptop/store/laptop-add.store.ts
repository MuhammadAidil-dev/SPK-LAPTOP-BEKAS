import { create } from 'zustand';

type LaptopAddForm = {
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

type LaptopAddStore = LaptopAddForm & {
  setField: <K extends keyof LaptopAddForm>(key: K, value: LaptopAddForm[K]) => void;
  reset: () => void;
};

const defaultValues: LaptopAddForm = {
  name: '',
  brand: '',
  price: 0,
  processor_score: 0,
  gpu_score: 0,
  ram: 8,
  storage: 256,
  condition: 3,
  age_months: 0,
  screen_size: 15.6,
  battery_life: 4,
};

export const useLaptopAddStore = create<LaptopAddStore>((set) => ({
  ...defaultValues,
  setField: (key, value) => set({ [key]: value }),
  reset: () => set(defaultValues),
}));
