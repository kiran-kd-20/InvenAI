'use client';

import { TrendingUp, Package, AlertCircle, ShoppingCart } from 'lucide-react';
import { SalesData } from '../lib/mockData';

interface DemandInsightsProps {
  data: SalesData[];
}

export function DemandInsights({ data }: DemandInsightsProps) {
  // Calculate insights
  const categoriesPerformance = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { sales: 0, forecast: 0, count: 0 };
    }
    acc[item.category].sales += item.sales;
    acc[item.category].forecast += item.forecast;
    acc[item.category].count += 1;
    return acc;
  }, {} as Record<string, { sales: number; forecast: number; count: number }>);

  const bestCategory = Object.entries(categoriesPerformance).reduce((best, [category, data]) => {
    return data.sales > best.sales ? { category, sales: data.sales } : best;
  }, { category: '', sales: 0 });

  const worstCategory = Object.entries(categoriesPerformance).reduce((worst, [category, data]) => {
    return data.sales < worst.sales ? { category, sales: data.sales } : worst;
  }, { category: '', sales: Infinity });

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalForecast = data.reduce((sum, item) => sum + item.forecast, 0);
  const trend = totalForecast > totalSales ? 'up' : 'down';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-inter">Demand Insights</h3>
          <p className="text-sm text-gray-500 font-inter">Key findings from your data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Best Performing Category */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="h-4 w-4 text-green-600" />
            <span className="text-xs font-medium text-green-800 font-inter uppercase tracking-wide">
              Best Category
            </span>
          </div>
          <p className="text-lg font-bold text-green-900 font-inter">{bestCategory.category}</p>
          <p className="text-sm text-green-700 font-inter">
            {bestCategory.sales.toLocaleString()} units sold
          </p>
        </div>

        {/* Worst Performing Category */}
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-xs font-medium text-red-800 font-inter uppercase tracking-wide">
              Needs Attention
            </span>
          </div>
          <p className="text-lg font-bold text-red-900 font-inter">{worstCategory.category}</p>
          <p className="text-sm text-red-700 font-inter">
            {worstCategory.sales.toLocaleString()} units sold
          </p>
        </div>

        {/* Forecast Trend */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-800 font-inter uppercase tracking-wide">
              Forecast Trend
            </span>
          </div>
          <p className="text-lg font-bold text-blue-900 font-inter capitalize">{trend}ward</p>
          <p className="text-sm text-blue-700 font-inter">
            {((Math.abs(totalForecast - totalSales) / totalSales) * 100).toFixed(1)}% variance
          </p>
        </div>

        {/* Total Data Points */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <ShoppingCart className="h-4 w-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-800 font-inter uppercase tracking-wide">
              Data Points
            </span>
          </div>
          <p className="text-lg font-bold text-purple-900 font-inter">{data.length}</p>
          <p className="text-sm text-purple-700 font-inter">
            records analyzed
          </p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-900 font-inter">Recommendation</h4>
            <p className="text-sm text-yellow-800 font-inter mt-1">
              {trend === 'up' 
                ? `Forecast indicates increasing demand. Consider increasing inventory for ${bestCategory.category} products.`
                : `Forecast shows declining trend. Review marketing strategies and inventory levels for ${worstCategory.category}.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
