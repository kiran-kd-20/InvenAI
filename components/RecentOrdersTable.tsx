'use client';

import { Eye, Download, MoreHorizontal } from 'lucide-react';

const recentOrders = [
  {
    id: '#3066',
    customer: 'Habib Hasan',
    orderId: '23032011',
    customerName: 'Hasan',
    quantity: 4,
    amount: '$40',
    payment: 'Processed',
    status: 'Delivered'
  },
  {
    id: '#3067',
    customer: 'Habib Hasan',
    orderId: '25032011',
    customerName: 'Hasan',
    quantity: 5,
    amount: '$34',
    payment: 'Processed',
    status: 'Delivered'
  },
  {
    id: '#3068',
    customer: 'Habib Hasan',
    orderId: '29032011',
    customerName: 'Hasan',
    quantity: 2,
    amount: '$23',
    payment: 'Processed',
    status: 'Delivered'
  },
  {
    id: '#3069',
    customer: 'Habib Hasan',
    orderId: '30032011',
    customerName: 'Hasan',
    quantity: 2,
    amount: '$34',
    payment: 'Processed',
    status: 'Delivered'
  },
  {
    id: '#3070',
    customer: 'Habib Hasan',
    orderId: '31032011',
    customerName: 'Hasan',
    quantity: 7,
    amount: '$56',
    payment: 'Processed',
    status: 'Delivered'
  },
];

export function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Quantity</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👤</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">{order.customer}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{order.orderId}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{order.customerName}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{order.quantity}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.amount}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {order.payment}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
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
