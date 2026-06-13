import { LucideIcon } from 'lucide-react';

export interface MetricCard {
  title: string;
  value: string | number;
  change?: string;
  description: string;
  icon: LucideIcon;
  bgIcon: string;
}
