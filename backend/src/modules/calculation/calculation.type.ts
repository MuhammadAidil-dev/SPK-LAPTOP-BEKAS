export interface ICriterionDetail {
  name: string;
  weight: number;
  normalized_weight: number;
  utility: number;
  weighted_score: number;
}

export interface ILaptopRanking {
  rank: number;
  laptop_id: string;
  name: string;
  brand: string;
  price: number;
  final_score: number;
  criteria: ICriterionDetail[];
}

export interface ICalculationResult {
  total_laptops: number;
  total_criteria: number;
  rankings: ILaptopRanking[];
}
