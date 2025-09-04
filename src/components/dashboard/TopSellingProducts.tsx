'use client';

import { cn } from '../../utils';
import { topSellingProducts } from '../../data/dashboard';

export function TopSellingProducts() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-inter">Top Selling Products</h3>
          <p className="text-sm text-gray-500 mt-1 font-inter">Best performing products this month</p>
        </div>
        <button 
          className="text-sm font-medium font-inter transition-colors duration-200 px-3 py-1 rounded-lg border"
          style={{ color: '#0d9488', borderColor: '#0d9488' }}
        >
          View
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Product</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Price</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Orders</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Stock</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {topSellingProducts.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-xs font-inter">📦</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 font-inter">{product.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-900 font-inter">{product.price}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600 font-inter">{product.orders}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600 font-inter">{product.stock}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button 
          className="w-8 h-8 rounded-full text-white text-sm font-medium font-inter"
          style={{ backgroundColor: '#0d9488' }}
        >
          1
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm font-medium font-inter hover:bg-gray-300 transition-colors">
          2
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm font-medium font-inter hover:bg-gray-300 transition-colors">
          3
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm font-medium font-inter hover:bg-gray-300 transition-colors">
          4
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm font-medium font-inter hover:bg-gray-300 transition-colors">
          5
        </button>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-3 font-inter">Showing 1 of 9 entries</p>
    </div>
  );
}
