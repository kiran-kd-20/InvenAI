'use client';

import { Eye, Download, MoreHorizontal } from 'lucide-react';
import { cn, getStatusColor, getInitials } from '../../utils';
import { recentOrders } from '../../data/dashboard';

export function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-inter">Recent Orders</h3>
          <p className="text-sm text-gray-500 mt-1 font-inter">Latest order activities</p>
        </div>
        <button 
          className="text-sm font-medium font-inter transition-colors duration-200 px-3 py-1 rounded-lg border"
          style={{ color: '#0d9488', borderColor: '#0d9488' }}
        >
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Product</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Name</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Order ID</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Customer Name</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Quantity</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Payment</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Status</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 font-inter uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {recentOrders.map((order, index) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="py-4 px-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                    <span className="text-white text-sm font-semibold font-inter">
                      {order.avatar}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-gray-900 font-inter">{order.customer}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600 font-inter">{order.orderId}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600 font-inter">{order.customerName}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600 font-inter">{order.quantity}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-semibold text-gray-900 font-inter">{order.amount}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-inter",
                    order.payment === 'Processed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.payment === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  )}>
                    {order.payment}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-inter",
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Processing' 
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'Shipped'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-red-100 text-red-800'
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <Download className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
