'use client';

import { TrendingUp, TrendingDown, Target, BarChart3 } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalSales: number;
    totalForecast: number;
    accuracy: number;
    trend: 'up' | 'down';
    dataPoints: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const variance = ((stats.totalForecast - stats.totalSales) / stats.totalSales) * 100;
  const absVariance = Math.abs(variance);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Sales */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalSales.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {stats.dataPoints} data points
            </p>
          </div>
        </div>
      </div>

      {/* Forecast Accuracy */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
            <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
            <p className="text-xs text-gray-500 mt-1">
              AI prediction precision
            </p>
          </div>
        </div>
      </div>

      {/* Demand Trend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {stats.trend === 'up' ? (
              <TrendingUp className="h-8 w-8 text-green-600" />
            ) : (
              <TrendingDown className="h-8 w-8 text-red-600" />
            )}
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-600">Demand Trend</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">
                {stats.trend === 'up' ? '+' : '-'}{absVariance.toFixed(1)}%
              </p>
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                stats.trend === 'up' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {stats.trend === 'up' ? 'Rising' : 'Falling'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              vs. historical average
            </p>
          </div>
        </div>
      </div>

      {/* Forecast Value */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <TrendingUp className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-600">Predicted Sales</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalForecast.toLocaleString()}
            </p>
            <div className="flex items-center mt-1">
              <span className={`text-xs px-2 py-1 rounded-full ${
                variance >= 0 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {variance >= 0 ? '+' : ''}{variance.toFixed(1)}% variance
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
