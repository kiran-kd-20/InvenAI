import { NextApiRequest, NextApiResponse } from 'next';
import StockOptimizationService, { OptimizationInput } from '../../../lib/services/stockOptimizationService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetOptimization(req, res);
        break;
      case 'POST':
        await handleCreateOptimization(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`,
          data: null,
        });
    }
  } catch (error) {
    console.error('Stock optimization API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: null,
    });
  }
}

/**
 * GET /api/optimization
 * Get stock optimization analysis
 * Query parameters:
 * - productId: specific product ID (optional)
 * - category: product category (optional)
 * - timeframe: weekly|monthly|quarterly (optional)
 * - analysis: abc|xyz|turnover|carrying_cost|all (optional)
 */
async function handleGetOptimization(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      productId, 
      category, 
      timeframe = 'monthly',
      analysis = 'all'
    } = req.query;

    // Validate analysis type
    const validAnalyses = ['abc', 'xyz', 'turnover', 'carrying_cost', 'all'];
    if (!validAnalyses.includes(analysis as string)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid analysis type. Must be one of: abc, xyz, turnover, carrying_cost, all',
        data: null,
      });
    }

    const optimizationInput: OptimizationInput = {
      productId: productId as string,
      category: category as string,
      timeframe: timeframe as 'weekly' | 'monthly' | 'quarterly',
      analysisType: analysis as 'abc' | 'xyz' | 'turnover' | 'carrying_cost' | 'all',
    };

    const result = await StockOptimizationService.analyzeStockOptimization(optimizationInput);

    return res.status(200).json({
      success: true,
      data: {
        ...result,
        metadata: {
          analysisDate: new Date().toISOString(),
          timeframe: optimizationInput.timeframe,
          analysisType: optimizationInput.analysisType,
          filters: {
            productId: optimizationInput.productId || null,
            category: optimizationInput.category || null,
          },
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Get optimization error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to perform stock optimization analysis',
      data: null,
    });
  }
}

/**
 * POST /api/optimization
 * Create custom stock optimization analysis
 */
async function handleCreateOptimization(req: NextApiRequest, res: NextApiResponse) {
  try {
    const optimizationInput: OptimizationInput = req.body;

    const result = await StockOptimizationService.analyzeStockOptimization(optimizationInput);

    return res.status(201).json({
      success: true,
      data: {
        ...result,
        metadata: {
          analysisDate: new Date().toISOString(),
          timeframe: optimizationInput.timeframe,
          analysisType: optimizationInput.analysisType,
          filters: {
            productId: optimizationInput.productId || null,
            category: optimizationInput.category || null,
          },
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Create optimization error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create stock optimization analysis',
      data: null,
    });
  }
}
