// Core Data Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'user';
}

export interface Order {
  id: string;
  orderId: string;
  customer: string;
  customerName: string;
  quantity: number;
  amount: string;
  payment: 'Processed' | 'Pending' | 'Failed';
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'Pending';
  date: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  orders: number;
  stock: number;
  category: string;
  image?: string;
}

export interface MetricCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  color: 'blue' | 'pink' | 'orange' | 'purple';
}

export interface SalesData {
  month: string;
  sales: number;
  date?: string;
}

export interface OrderReportData {
  name: string;
  value: number;
  color: string;
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  isActive?: boolean;
}

// Chart Types
export interface ChartProps {
  data: any[];
  className?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Dashboard State Types
export interface DashboardMetrics {
  inventoryValue: string;
  totalOrders: string;
  newOrders: string;
  delivered: string;
}

export interface DashboardState {
  metrics: DashboardMetrics;
  recentOrders: Order[];
  topProducts: Product[];
  salesData: SalesData[];
  orderReportData: OrderReportData[];
  isLoading: boolean;
  error: string | null;
}
