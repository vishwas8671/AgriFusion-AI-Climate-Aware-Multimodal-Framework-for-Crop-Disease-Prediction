import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: 'green' | 'amber' | 'red' | 'neutral';
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  description,
  icon: Icon,
  badge,
  badgeColor = 'neutral',
  trend,
}) => {
  const badgeClasses = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-sage/70 text-forest border-neutralgrey-border/60',
  }[badgeColor];

  return (
    <div className="card-scientific flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-neutralgrey uppercase tracking-wider">{title}</span>
          <div className="w-8 h-8 rounded-md bg-sage/60 flex items-center justify-center text-forest border border-neutralgrey-border/40">
            <Icon className="w-4 h-4 text-agri" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 my-1">
          <span className="text-2xl font-bold tracking-tight text-forest">{value}</span>
          {unit && <span className="text-xs font-medium text-neutralgrey">{unit}</span>}
        </div>

        {description && <p className="text-xs text-neutralgrey leading-relaxed mt-1">{description}</p>}
      </div>

      {(badge || trend) && (
        <div className="mt-3 pt-2.5 border-t border-neutralgrey-border/40 flex items-center justify-between text-[11px]">
          {badge && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${badgeClasses}`}>
              {badge}
            </span>
          )}
          {trend && (
            <span className={trend.isPositive ? 'text-emerald-700 font-medium' : 'text-neutralgrey font-medium'}>
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
