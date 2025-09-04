'use client';

import { TrendingUp, TrendingDown, Package, ShoppingCart, Truck, CheckCircle } from 'lucide-react';
import { cn } from '../../utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  color: 'blue' | 'red' | 'orange' | 'purple';
  className?: string;
}

const colorConfig = {
  blue: {
    icon: '#3B82F6',
    iconBg: '#DBEAFE',
    iconComponent: Package,
  },
  red: {
    icon: '#EF4444', 
    iconBg: '#FEE2E2',
    iconComponent: ShoppingCart,
  },
  orange: {
    icon: '#F97316',
    iconBg: '#FED7AA',
    iconComponent: TrendingUp,
  },
  purple: {
    icon: '#8B5CF6',
    iconBg: '#EDE9FE',
    iconComponent: CheckCircle,
  },
};

export function MetricCard({ 
  title, 
  value, 
  change, 
  isPositive = true, 
  color, 
  className 
}: MetricCardProps) {
  const config = colorConfig[color];
  const IconComponent = config.iconComponent;

  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 shadow-card border border-gray-100",
      "transition-all duration-200 hover:shadow-lg hover:border-gray-200",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium font-inter mb-2">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 font-inter mb-3">
            {value}
          </p>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={cn(
              "text-sm font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}>
              {change}
            </span>
          </div>
        </div>
        
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: config.iconBg }}
        >
          <IconComponent className="h-6 w-6" style={{ color: config.icon }} />
        </div>
      </div>
    </div>
  );
}
