import { useState, useEffect } from 'react';

interface DashboardData {
  metrics: {
    inventoryValue: string;
    totalOrders: string;
    newOrders: string;
    delivered: string;
  };
  orders: any[];
  products: any[];
  charts: {
    salesData: any[];
    orderReport: any[];
  };
}

interface ApiResponse {
  success: boolean;
  data: DashboardData;
  error: string | null;
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard');
        const result: ApiResponse = await response.json();
        
        if (result.success) {
          setData(result.data);
          setError(null);
        } else {
          setError(result.error || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Network error: Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { data, loading, error };
};
