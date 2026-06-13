import { Document } from 'mongoose';

export type TCriteriaType = 'benefit' | 'cost';

export interface ICriteria {
  name: string;
  weight: number; // 0–1
  type: TCriteriaType;
  isActive?: boolean;
}

export type ICriteriaDocument = ICriteria & Document;
export type ICriteriaResponse = ICriteria & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateCriteriaDTO = Pick<ICriteria, 'name' | 'type' | 'weight'>;
export type UpdateCriteriaDTO = Partial<ICriteria>;
