/**
 * Mock Data Store for InvenAI APIs
 */

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  unitPrice: number;
  costPrice: number;
  supplier: string;
  isActive: boolean;
}

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    sku: 'WH-001',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    brand: 'TechBrand',
    unitPrice: 129.99,
    costPrice: 80.00,
    supplier: 'TechSupplier',
    isActive: true,
  },
  {
    id: 'prod_002',
    sku: 'CT-001',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    category: 'Clothing',
    brand: 'FashionBrand',
    unitPrice: 24.99,
    costPrice: 12.00,
    supplier: 'FashionSupplier',
    isActive: true,
  },
];

export const getAllProducts = (): Product[] => mockProducts;

export const createApiResponse = (success: boolean, data: any = null, error: string | null = null) => {
  return {
    success,
    data,
    error,
    timestamp: new Date().toISOString(),
  };
};

// Dashboard Metrics
export const dashboardMetrics = {
  inventoryValue: "$2,54,000",
  totalOrders: "2,655",
  newOrders: "782", 
  delivered: "367",
  totalRevenue: 125000,
  averageOrderValue: 100,
  conversionRate: 2.5
};

// Sales Data Interface
export interface SalesData {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  reorderThreshold: number;
  predictedDemand: number;
  region: string;
  date?: string;
}

// Mock Sales Data
export const mockSalesData: SalesData[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    currentStock: 45,
    reorderThreshold: 50,
    predictedDemand: 120,
    region: 'North',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    category: 'Electronics',
    currentStock: 80,
    reorderThreshold: 60,
    predictedDemand: 95,
    region: 'North',
    date: '2024-01-16'
  },
  {
    id: '3',
    name: 'Winter Jacket',
    category: 'Clothing',
    currentStock: 25,
    reorderThreshold: 30,
    predictedDemand: 75,
    region: 'South',
    date: '2024-01-17'
  },
  {
    id: '4',
    name: 'Running Shoes',
    category: 'Clothing',
    currentStock: 120,
    reorderThreshold: 40,
    predictedDemand: 65,
    region: 'North',
    date: '2024-01-18'
  },
  {
    id: '5',
    name: 'Garden Tools Set',
    category: 'Home & Garden',
    currentStock: 15,
    reorderThreshold: 20,
    predictedDemand: 45,
    region: 'South',
    date: '2024-01-19'
  },
  {
    id: '6',
    name: 'Kitchen Appliance',
    category: 'Home & Garden',
    currentStock: 60,
    reorderThreshold: 35,
    predictedDemand: 80,
    region: 'North',
    date: '2024-01-20'
  },
];

// Helper functions
export const getCategories = (): string[] => {
  return Array.from(new Set(mockSalesData.map(item => item.category)));
};

export const getRegions = (): string[] => {
  return Array.from(new Set(mockSalesData.map(item => item.region)));
};

export const filterSalesData = (
  data: SalesData[],
  filters: {
    category?: string;
    region?: string;
    startDate?: string;
    endDate?: string;
  }
): SalesData[] => {
  return data.filter(item => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.region && item.region !== filters.region) return false;
    if (filters.startDate && item.date && item.date < filters.startDate) return false;
    if (filters.endDate && item.date && item.date > filters.endDate) return false;
    return true;
  });
};

// Recent Orders Interface
export interface RecentOrder {
  id: string;
  customerName: string;
  product: string;
  orderID: string;
  quantity: number;
  amount: number;
  payment: 'Paid' | 'Pending' | 'Failed';
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  date: string;
}

// Mock Recent Orders
export const mockRecentOrders: RecentOrder[] = [
  {
    id: '1',
    customerName: 'John Smith',
    product: 'Wireless Bluetooth Headphones',
    orderID: 'ORD-001',
    quantity: 2,
    amount: 259.98,
    payment: 'Paid',
    status: 'Delivered',
    date: '2024-01-20'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    product: 'Cotton T-Shirt',
    orderID: 'ORD-002',
    quantity: 3,
    amount: 74.97,
    payment: 'Paid',
    status: 'Processing',
    date: '2024-01-19'
  },
  {
    id: '3',
    customerName: 'Mike Davis',
    product: 'Running Sneakers',
    orderID: 'ORD-003',
    quantity: 1,
    amount: 89.99,
    payment: 'Pending',
    status: 'Shipped',
    date: '2024-01-18'
  },
  {
    id: '4',
    customerName: 'Emily Wilson',
    product: 'Water Bottle',
    orderID: 'ORD-004',
    quantity: 4,
    amount: 79.96,
    payment: 'Paid',
    status: 'Delivered',
    date: '2024-01-17'
  },
  {
    id: '5',
    customerName: 'David Brown',
    product: 'Gaming Laptop',
    orderID: 'ORD-005',
    quantity: 1,
    amount: 1299.99,
    payment: 'Failed',
    status: 'Cancelled',
    date: '2024-01-16'
  }
];

// Top Selling Products Interface
export interface TopSellingProduct {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
  image?: string;
}

// Mock Top Selling Products
export const mockTopSellingProducts: TopSellingProduct[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    sales: 156,
    revenue: 20284.44,
    growth: 12.5
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    category: 'Clothing',
    sales: 234,
    revenue: 5847.66,
    growth: 8.3
  },
  {
    id: '3',
    name: 'Running Sneakers',
    category: 'Footwear',
    sales: 89,
    revenue: 8009.11,
    growth: 15.7
  },
  {
    id: '4',
    name: 'Water Bottle',
    category: 'Accessories',
    sales: 312,
    revenue: 6236.88,
    growth: 22.1
  },
  {
    id: '5',
    name: 'Gaming Laptop',
    category: 'Electronics',
    sales: 45,
    revenue: 58499.55,
    growth: 5.2
  }
];
