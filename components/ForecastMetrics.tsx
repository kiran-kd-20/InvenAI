'use client';

import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';
import { SalesData } from '../lib/mockData';

interface ForecastMetricsProps {
  data: SalesData[];
}

export function ForecastMetrics({ data }: ForecastMetricsProps) {
  // Calculate metrics from the data
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalForecast = data.reduce((sum, item) => sum + item.forecast, 0);
  const accuracy = totalSales > 0 ? ((1 - Math.abs(totalForecast - totalSales) / totalSales) * 100).toFixed(1) : '0';
  const variance = totalForecast - totalSales;
  const variancePercentage = totalSales > 0 ? ((variance / totalSales) * 100).toFixed(1) : '0';

  const isPositiveVariance = variance > 0;
  const averageDaily = totalSales / data.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Forecast Accuracy */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 font-inter">
                  Forecast Accuracy
                </h3>
                <p className="text-xs text-gray-500 font-inter mt-1">
                  prediction precision
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 font-inter">
                {accuracy}%
              </p>
              <p className="text-xs text-gray-500 font-inter">
                vs actual sales
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 font-inter">
            <Target className="h-3 w-3" />
            <span>Good</span>
          </div>
        </div>
      </div>

      {/* Sales Variance */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isPositiveVariance ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {isPositiveVariance ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 font-inter">
                  Sales Variance
                </h3>
                <p className="text-xs text-gray-500 font-inter mt-1">
                  forecast vs actual
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 font-inter">
                {Math.abs(variance).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 font-inter">
                {isPositiveVariance ? 'over' : 'under'} forecast
              </p>
            </div>
          </div>
          
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositiveVariance 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          } font-inter`}>
            {isPositiveVariance ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{variancePercentage}%</span>
          </div>
        </div>
      </div>

      {/* Total Sales */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 font-inter">
                  Total Sales
                </h3>
                <p className="text-xs text-gray-500 font-inter mt-1">
                  actual performance
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 font-inter">
                {totalSales.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 font-inter">
                units sold
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 font-inter">
            <TrendingUp className="h-3 w-3" />
            <span>+{((totalSales / (data.length * 1000)) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Average Daily Sales */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 font-inter">
                  Daily Average
                </h3>
                <p className="text-xs text-gray-500 font-inter mt-1">
                  sales per day
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 font-inter">
                {averageDaily.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-500 font-inter">
                units per day
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 font-inter">
            <Target className="h-3 w-3" />
            <span>Stable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
