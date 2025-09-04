'use client';

const topProducts = [
  { name: 'Puma Soft', price: '$53.56', orders: 15, stock: 356 },
  { name: 'Puma Soft', price: '$53.56', orders: 13, stock: 296 },
  { name: 'Puma Soft', price: '$53.56', orders: 14, stock: 296 },
];

export function TopSellingProducts() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
        <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
          View
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Product</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Orders</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Stock</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <span className="text-sm text-gray-900">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{product.price}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{product.orders}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 space-x-2">
        <button className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm">1</button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm">2</button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm">3</button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm">4</button>
        <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm">5</button>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-2">Showing 1 of 9 entries</p>
    </div>
  );
}
