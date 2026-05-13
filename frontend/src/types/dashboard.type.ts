/**
 * Global Type Definitions
 */

import { LucideIcon } from 'lucide-react';

export interface Laptop {
  id: string;
  name: string;
  price: number;
  cpuScore: number;
  ram: number;
  storage: number;
  performanceScore: number;
  conditionScore: number;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Criteria {
  id: string;
  name: string;
  weight: number;
  type: 'benefit' | 'cost';
  isActive: boolean;
  createdAt: Date;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: string;
  description: string;
  icon: LucideIcon;
  bgIcon: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}
