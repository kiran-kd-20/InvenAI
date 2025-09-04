'use client';

import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../src/utils';

interface DemandForecastCardProps {
  title: string;
  currentValue: string | number;
  forecastValue: string | number;
  change: string;
  isPositive: boolean;
  color: 'blue' | 'red' | 'orange' | 'purple' | 'green';
  period?: string;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    iconBg: 'bg-blue-100',
    border: 'border-blue-200'
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    iconBg: 'bg-red-100',
    border: 'border-red-200'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    iconBg: 'bg-orange-100',
    border: 'border-orange-200'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    iconBg: 'bg-purple-100',
    border: 'border-purple-200'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    iconBg: 'bg-green-100',
    border: 'border-green-200'
  }
};

export function DemandForecastCard({ 
  title, 
  currentValue, 
  forecastValue, 
  change, 
  isPositive, 
  color,
  period = 'this month'
}: DemandForecastCardProps) {
  const colorConfig = colorClasses[color];

  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 shadow-card border transition-all duration-200 hover:shadow-lg",
      colorConfig.border
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              colorConfig.iconBg
            )}>
              <TrendingUp className={cn("h-5 w-5", colorConfig.icon)} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 font-inter">
                {title}
              </h3>
              <p className="text-xs text-gray-500 font-inter mt-1">
                {period}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Current Value */}
            <div>
              <p className="text-xs text-gray-500 font-inter uppercase tracking-wide">
                CURRENT
              </p>
              <p className="text-2xl font-bold text-gray-900 font-inter">
                {currentValue}
              </p>
            </div>
            
            {/* Forecast Value */}
            <div>
              <p className="text-xs text-gray-500 font-inter uppercase tracking-wide">
                FORECAST
              </p>
              <p className="text-xl font-semibold text-gray-700 font-inter">
                {forecastValue}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className={cn(
            "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
            isPositive 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            {isPositive ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            <span className="font-inter">{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
