export interface ICalculationCriteria {
  name: string;
  weight: number;
  normalized_weight: number;
  utility: number;
  weighted_score: number;
}

export interface ICalculationRanking {
  rank: number;
  laptop_id: string;
  name: string;
  brand: string;
  price: number;
  final_score: number;
  criteria: ICalculationCriteria[];
}

export interface ICalculationResult {
  total_laptops: number;
  total_criteria: number;
  rankings: ICalculationRanking[];
}
