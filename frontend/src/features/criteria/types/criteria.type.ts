export interface ICriteria {
  id: string;
  name: string;
  weight: number;
  type: 'benefit' | 'cost';
  isActive: boolean;
  createdAt: Date;
}
