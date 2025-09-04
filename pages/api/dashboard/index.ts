import { NextApiRequest, NextApiResponse } from 'next';
import { dashboardMetrics, recentOrders, topSellingProducts, salesChartData, orderReportData } from '../../../src/data/dashboard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetDashboardData(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`,
          data: null,
        });
    }
  } catch (error) {
    console.error('Dashboard API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: null,
    });
  }
}

/**
 * GET /api/dashboard
 * Get dashboard data including metrics, orders, products, and charts
 */
async function handleGetDashboardData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { section } = req.query;

    // If specific section requested, return only that section
    if (section) {
      switch (section) {
        case 'metrics':
          return res.status(200).json({
            success: true,
            data: dashboardMetrics,
            error: null,
          });
        case 'orders':
          return res.status(200).json({
            success: true,
            data: recentOrders,
            error: null,
          });
        case 'products':
          return res.status(200).json({
            success: true,
            data: topSellingProducts,
            error: null,
          });
        case 'charts':
          return res.status(200).json({
            success: true,
            data: {
              salesData: salesChartData,
              orderReport: orderReportData,
            },
            error: null,
          });
        default:
          return res.status(400).json({
            success: false,
            error: 'Invalid section parameter',
            data: null,
          });
      }
    }

    // Return all dashboard data
    const dashboardData = {
      metrics: dashboardMetrics,
      orders: recentOrders,
      products: topSellingProducts,
      charts: {
        salesData: salesChartData,
        orderReport: orderReportData,
      },
    };

    return res.status(200).json({
      success: true,
      data: dashboardData,
      error: null,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data',
      data: null,
    });
  }
}
