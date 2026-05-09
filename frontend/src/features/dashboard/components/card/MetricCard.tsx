import { MetricCard as MetricCardType } from '@/types/dashboard.type';
import { LucideIcon } from 'lucide-react';

interface MetricCardComponentProps {
  metric: MetricCardType;
  icon: LucideIcon;
}

export function MetricCard({ metric, icon: Icon }: MetricCardComponentProps) {
  return (
    <div className="bg-surface-container-lowest border border-secondary/10 shadow-sm p-6 rounded-xl flex flex-col gap-2">
      {/* Header dengan Icon */}
      <div className="flex items-center justify-between">
        <p className="text-on-surface-variant text-sm font-medium">
          {metric.title}
        </p>
        <div className={`${metric.bgIcon} p-2 rounded-lg`}>
          <span className="material-symbols-outlined text-xl">
            <Icon />
          </span>
        </div>
      </div>

      {/* Value dengan Change Indicator */}
      <div className="flex items-baseline gap-2 mt-2">
        <h3 className="text-3xl font-bold text-on-surface">{metric.value}</h3>
        {metric.change && (
          <span className="text-primary text-sm font-bold">
            {metric.change}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-on-surface-variant">{metric.description}</p>
    </div>
  );
}
