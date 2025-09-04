'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { cn } from '../../utils';
import { salesChartData, orderReportData } from '../../data/dashboard';

export function SalesChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg font-inter">
          <p className="font-medium text-gray-900 text-sm mb-1">{label}</p>
          <p className="text-sm text-blue-600">
            Sales: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-inter">Overall Sales</h3>
          <p className="text-sm text-gray-500 mt-1 font-inter">Monthly sales performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0d9488' }}></div>
            <span className="text-sm text-gray-600 font-inter">Orders</span>
          </div>
          <button 
            className="text-sm font-medium font-inter transition-colors duration-200 px-3 py-1 rounded-lg border"
            style={{ color: '#0d9488', borderColor: '#0d9488' }}
          >
            This Month
          </button>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', fontFamily: 'Inter' }}
              tickFormatter={(value) => `${(value / 1000)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#0d9488"
              strokeWidth={3}
              dot={{ fill: '#0d9488', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#0d9488', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function OrderReportChart() {
  const total = orderReportData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg font-inter">
          <p className="font-medium text-gray-900 text-sm mb-1">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.value}% ({((data.value / 100) * total).toFixed(0)} orders)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-inter">Order Report Summary</h3>
          <p className="text-sm text-gray-500 mt-1 font-inter">Distribution of order statuses</p>
        </div>
        <button 
          className="text-sm font-medium font-inter transition-colors duration-200 px-3 py-1 rounded-lg border"
          style={{ color: '#0d9488', borderColor: '#0d9488' }}
        >
          View
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="w-36 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderReportData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {orderReportData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 ml-8 space-y-3">
          {orderReportData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 font-inter">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 font-inter">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
