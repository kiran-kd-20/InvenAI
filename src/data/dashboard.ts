import { Order, Product, SalesData, OrderReportData, DashboardMetrics } from '../types';

// Dashboard Metrics Data
export const dashboardMetrics: DashboardMetrics = {
  inventoryValue: '$2,54,000',
  totalOrders: '2,658',
  newOrders: '782',
  delivered: '367',
};

// Recent Orders Data
export const recentOrders: Order[] = [
  {
    id: '1',
    orderId: '23032011',
    customer: 'Habib Hasan',
    customerName: 'Hasan',
    quantity: 4,
    amount: '$40',
    payment: 'Processed',
    status: 'Delivered',
    date: '2024-03-23',
    avatar: 'HH'
  },
  {
    id: '2',
    orderId: '25032011',
    customer: 'Habib Hasan',
    customerName: 'Hasan',
    quantity: 5,
    amount: '$34',
    payment: 'Processed',
    status: 'Delivered',
    date: '2024-03-25',
    avatar: 'HH'
  },
  {
    id: '3',
    orderId: '29032011',
    customer: 'Habib Hasan',
    customerName: 'Hasan',
    quantity: 2,
    amount: '$23',
    payment: 'Processed',
    status: 'Delivered',
    date: '2024-03-29',
    avatar: 'HH'
  },
  {
    id: '4',
    orderId: '30032011',
    customer: 'Habib Hasan',
    customerName: 'Hasan',
    quantity: 2,
    amount: '$34',
    payment: 'Processed',
    status: 'Delivered',
    date: '2024-03-30',
    avatar: 'HH'
  },
  {
    id: '5',
    orderId: '31032011',
    customer: 'Habib Hasan',
    customerName: 'Hasan',
    quantity: 7,
    amount: '$56',
    payment: 'Processed',
    status: 'Delivered',
    date: '2024-03-31',
    avatar: 'HH'
  },
];

// Top Selling Products Data
export const topSellingProducts: Product[] = [
  {
    id: '1',
    name: 'Puma Soft',
    price: '$53.56',
    orders: 15,
    stock: 356,
    category: 'Footwear',
  },
  {
    id: '2',
    name: 'Puma Soft',
    price: '$53.56',
    orders: 13,
    stock: 296,
    category: 'Footwear',
  },
  {
    id: '3',
    name: 'Puma Soft',
    price: '$53.56',
    orders: 14,
    stock: 296,
    category: 'Footwear',
  },
];

// Sales Chart Data
export const salesChartData: SalesData[] = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
  { month: 'Jul', sales: 7000 },
  { month: 'Aug', sales: 6500 },
  { month: 'Sep', sales: 8000 },
  { month: 'Oct', sales: 7500 },
  { month: 'Nov', sales: 9000 },
  { month: 'Dec', sales: 8500 },
];

// Order Report Pie Chart Data
export const orderReportData: OrderReportData[] = [
  { name: 'Completed', value: 45, color: '#10B981' },
  { name: 'Pending', value: 25, color: '#F59E0B' },
  { name: 'Processing', value: 20, color: '#3B82F6' },
  { name: 'Cancelled', value: 10, color: '#EF4444' },
];

// Navigation Menu Items
export const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard', isActive: true },
  { name: 'Inventory Forecast', href: '/inventory-forecast', icon: 'TrendingUp' },
  { name: 'Inventory', href: '/inventory', icon: 'Package' },
  { name: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { name: 'Notifications', href: '/notifications', icon: 'Bell' },
  { name: 'Supplier Management', href: '/suppliers', icon: 'Users' },
  { name: 'Stock Optimization', href: '/stock-optimization', icon: 'Target' },
  { name: 'Replenishment and Orders', href: '/orders', icon: 'ShoppingCart' },
  { name: 'Settings', href: '/settings', icon: 'Settings' },
];

// User Data
export const currentUser = {
  id: '1',
  name: 'Ahmed',
  email: 'ahmed123@gmail.com',
  avatar: 'A',
  role: 'admin' as const,
};
