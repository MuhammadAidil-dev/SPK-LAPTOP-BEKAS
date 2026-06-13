export type CriteriaType = 'cost' | 'benefit';

export interface ICriteria {
  _id: string;
  name: string;
  weight: number;
  type: CriteriaType;
  isActive: boolean;
  createdAt: string;
}

export type CriteriaDTO = {
  name: string;
  weight: number;
  type: CriteriaType;
};
