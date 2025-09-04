'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  bgColor: string;
  iconColor: string;
}

export function MetricCard({ title, value, change, isPositive, bgColor, iconColor }: MetricCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {isPositive ? (
              <TrendingUp className={`h-4 w-4 ${iconColor}`} />
            ) : (
              <TrendingDown className={`h-4 w-4 ${iconColor}`} />
            )}
            <span className={`text-sm ml-1 ${iconColor}`}>{change}</span>
          </div>
        </div>
        <div className={`w-12 h-12 ${iconColor.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center`}>
          <div className={`w-6 h-6 ${iconColor.replace('text-', 'bg-')} rounded-full`}></div>
        </div>
      </div>
    </div>
  );
}
