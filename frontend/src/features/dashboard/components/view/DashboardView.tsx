'use client';

import { MetricCard } from '../card/MetricCard';
import { LaptopTable } from '@/components/ui/LaptopTable';
import { ILaptop } from '@/types/laptop.type';
import { Laptop as LaptopIcon, SlidersHorizontal } from 'lucide-react';
import { useTransition } from 'react';
import { deleteLaptopAction } from '@/features/laptop/actions/laptop.action';

type Props = {
  laptops: ILaptop[];
  criteriaCount: number;
};

export default function DashboardView({ laptops, criteriaCount }: Props) {
  const [, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteLaptopAction(id);
    });
  };

  const metrics = [
    {
      title: 'Total Laptops',
      value: laptops.length,
      description: 'Inventory units tracked',
      icon: LaptopIcon,
      bgIcon: 'bg-primary text-white',
    },
    {
      title: 'Total Criteria',
      value: criteriaCount,
      description: 'SMART weight parameters',
      icon: SlidersHorizontal,
      bgIcon: 'bg-secondary text-white',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} icon={metric.icon} />
        ))}
      </div>

      <div className="border border-secondary/10 shadow-sm rounded-xl overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h3 className="text-h1 text-on-surface">Recent Laptop Entries</h3>
            <p className="text-body-sm text-on-surface-variant">
              Manage and review the latest second-hand laptop data.
            </p>
          </div>
        </div>

        <LaptopTable laptops={laptops} onDelete={handleDelete} />

        <div className="p-6 flex items-center justify-between">
          <span className="text-sm">
            {laptops.length} laptop{laptops.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
