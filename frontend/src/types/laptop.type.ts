export interface ILaptop {
  id: string;
  name: string;
  price: number;
  processor: string;
  ram: string;
  performance_score: number;
  condition_score: number;
  age: number;
}

export type Result = {
  laptop_id: string;
  final_score: number;
  rank: number;
};
