'use client';

import React from 'react';
import { Search, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { month: 'Jan', value: 30 },
  { month: 'Feb', value: 25 },
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 35 },
  { month: 'May', value: 50 },
  { month: 'Jun', value: 45 },
  { month: 'Jul', value: 60 },
  { month: 'Aug', value: 55 },
  { month: 'Sep', value: 70 },
  { month: 'Oct', value: 65 },
  { month: 'Nov', value: 80 },
  { month: 'Dec', value: 75 }
];

const pieData = [
  { name: 'Completed', value: 45, color: '#0f766e' },
  { name: 'High Priority', value: 25, color: '#f59e0b' },
  { name: 'Medium Priority', value: 20, color: '#10b981' },
  { name: 'Low Priority', value: 10, color: '#3b82f6' }
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#e6fffa' }}>
      {/* Sidebar */}
      <div className="w-64 min-h-screen flex flex-col" style={{ backgroundColor: '#115e59' }}>
        {/* User Profile */}
        <div className="p-6 border-b" style={{ borderColor: '#0f766e' }}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">A</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Ahmed</h3>
              <p className="text-teal-300 text-xs">ahmed123@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white" style={{ backgroundColor: '#0f766e' }}>
                <div className="w-5 h-5 bg-white rounded-sm"></div>
                <span className="text-sm font-medium">Dashboard</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 text-teal-200 hover:text-white cursor-pointer">
                <div className="w-5 h-5"></div>
                <span className="text-sm">Inventory Forecast</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 text-teal-200 hover:text-white cursor-pointer">
                <div className="w-5 h-5"></div>
                <span className="text-sm">Inventory</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 text-teal-200 hover:text-white cursor-pointer">
                <div className="w-5 h-5"></div>
                <span className="text-sm">Analytics</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 text-teal-200 hover:text-white cursor-pointer">
                <div className="w-5 h-5"></div>
                <span className="text-sm">Notifications</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 text-teal-200 hover:text-white cursor-pointer">
                <div className="w-5 h-5"></div>
                <span className="text-sm">Supplier Management</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 text-teal-200 hover:text-white cursor-pointer">
                <div className="w-5 h-5"></div>
                <span className="text-sm">Stock Optimization</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 text-teal-200 hover:text-white cursor-pointer">
                <div className="w-5 h-5"></div>
                <span className="text-sm">Replenishment and Orders</span>
              </div>
            </li>
            <li>
              <div className="flex items-center space-x-3 px-4 py-3 text-teal-200 hover:text-white cursor-pointer">
                <div className="w-5 h-5"></div>
                <span className="text-sm">Settings</span>
              </div>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: '#0f766e' }}>
          <button className="w-full text-white py-2 px-4 rounded-lg text-sm font-medium" style={{ backgroundColor: '#0f766e' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#0f766e' }}>
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
            </div>
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6" style={{ backgroundColor: '#e6fffa' }}>
          {/* Activity Header */}
          <div className="mb-6">
            <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">20 May 21 May</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Week</span>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {/* Inventory Value */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Inventory Value</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">$2,54,000</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <span>↗</span>
                    <span className="ml-1">3% from last week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">2,658</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <span>↗</span>
                    <span className="ml-1">3% from last week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* New Orders */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">New Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">782</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <span>↗</span>
                    <span className="ml-1">3% from last week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                </div>
              </div>
            </div>

            {/* Delivered */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">367</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <span>↗</span>
                    <span className="ml-1">3% from last week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Overall Sales Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Overall Sales</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0f766e' }}></div>
                    <span className="text-sm text-gray-600">Orders</span>
                  </div>
                  <button className="text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#0f766e' }}>
                    This Month
                  </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#6B7280' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#6B7280' }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0f766e" 
                      strokeWidth={3}
                      dot={{ fill: '#0f766e', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: '#0f766e', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Order Report Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order Report Summary</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-red-500 text-sm">▲</span>
                    <span className="text-sm text-gray-600 ml-1">590,567</span>
                  </div>
                </div>
                <button className="text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#0f766e' }}>
                  View
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 ml-6 space-y-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#0f766e' }}>
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Customer Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Quantity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Payment</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">HH</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Habib Hasan</td>
                      <td className="px-6 py-4 text-sm text-gray-600">23032011</td>
                      <td className="px-6 py-4 text-sm text-gray-600">Habib</td>
                      <td className="px-6 py-4 text-sm text-gray-600">4</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">$40</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Processed
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <span className="text-blue-600 text-lg">👁</span>
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <span className="text-red-600 text-lg">🗑</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
              <button className="text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#0f766e' }}>
                View
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Orders</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Stock</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {[
                    { name: "Puma Soft", price: "$53.56", orders: "15", stock: "356" },
                    { name: "Puma Soft", price: "$53.56", orders: "13", stock: "296" },
                    { name: "Puma Soft", price: "$53.56", orders: "14", stock: "296" }
                  ].map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-lg">📦</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.orders}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button className="w-8 h-8 text-white rounded-full text-sm font-medium" style={{ backgroundColor: '#0f766e' }}>1</button>
                <button className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">2</button>
                <button className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">3</button>
                <button className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">4</button>
                <button className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors">5</button>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">Showing 1 of 9 entries</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
