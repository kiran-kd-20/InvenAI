'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ForecastChartProps {
  data: any[];
  title?: string;
  height?: number;
}

export function ForecastChart({ data, title = "Overall Sales", height = 300 }: ForecastChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg font-inter">
          <p className="font-medium text-gray-900 text-sm mb-2">
            {new Date(label).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span> {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex items-center justify-center space-x-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600 font-inter">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-inter">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 font-inter">Sales vs Forecast comparison</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="text-sm font-medium font-inter transition-colors duration-200 px-4 py-2 rounded-lg"
            style={{ 
              color: '#0d9488', 
              backgroundColor: '#f0fdfa',
              border: '1px solid #99f6e4'
            }}
          >
            This Month
          </button>
        </div>
      </div>
      
      <div style={{ height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter' }}
              tickFormatter={(value) => `${(value / 1000)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#0d9488"
              strokeWidth={3}
              dot={{ fill: '#0d9488', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0d9488', strokeWidth: 2, fill: '#ffffff' }}
              name="Sales"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#06b6d4"
              strokeWidth={3}
              strokeDasharray="8 8"
              dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2, fill: '#ffffff' }}
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
