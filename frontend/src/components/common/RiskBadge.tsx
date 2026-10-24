import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, Flame } from 'lucide-react';

interface RiskBadgeProps {
  level: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Healthy' | 'Uncertain';
  className?: string;
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className = '', showIcon = true }) => {
  switch (level) {
    case 'Healthy':
    case 'Low':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 ${className}`}>
          {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
          {level === 'Healthy' ? 'Healthy Tissue' : 'Low Risk'}
        </span>
      );
    case 'Moderate':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 ${className}`}>
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
          Moderate Favourability
        </span>
      );
    case 'High':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-800 border border-red-300 ${className}`}>
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-red-600" />}
          High Infection Risk
        </span>
      );
    case 'Critical':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-900 border border-red-400 font-bold animate-pulse ${className}`}>
          {showIcon && <Flame className="w-3.5 h-3.5 text-red-700" />}
          Critical Outbreak Favourability
        </span>
      );
    case 'Uncertain':
    default:
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300 ${className}`}>
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-slate-500" />}
          Uncertain / Low Confidence
        </span>
      );
  }
};
