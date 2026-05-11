export interface ICriteria {
  id: string;
  name: string;
  weight: number;
  type: 'benefit' | 'cost';
  isActive: boolean;
  createdAt: string;
}

export type CriteriaDTO = {
  name: string;
  description: string;
  weight: number;
  type: 'benefit' | 'cost';
};
