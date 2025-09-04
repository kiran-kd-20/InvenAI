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
 */
async function handleGetOptimization(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { productId, category, timeframe, analysis } = req.query;

    // Handle ABC analysis request
    if (analysis === 'abc') {
      const abcAnalysis = await StockOptimizationService.getABCAnalysis();
      return res.status(200).json({
        success: true,
        data: {
          analysis: 'abc',
          classification: abcAnalysis,
        },
        error: null,
      });
    }

    const input: OptimizationInput = {
      ...(productId && { productId: productId as string }),
      ...(category && { category: category as string }),
      analyzeAll: !productId && !category,
      ...(timeframe && { timeframe: parseInt(timeframe as string) }),
    };

    const result = await StockOptimizationService.analyzeStockOptimization(input);

    // Filter results based on status if requested
    const { status } = req.query;
    let filteredResults = result.results;
    if (status) {
      filteredResults = result.results.filter(r => 
        r.status.toLowerCase() === status.toString().toLowerCase()
      );
    }

    return res.status(200).json({
      success: true,
      data: {
        results: filteredResults,
        summary: {
          ...result.summary,
          filteredCount: filteredResults.length,
        },
        meta: {
          totalAnalyzed: result.results.length,
          timeframe: input.timeframe || 90,
          filters: { productId, category, status },
        },
      },
      error: null,
    });
  } catch (error: any) {
    console.error('Get optimization error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve optimization analysis',
      data: null,
    });
  }
}

/**
 * POST /api/optimization
 * Generate new stock optimization analysis
 */
async function handleCreateOptimization(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { productId, category, analyzeAll, timeframe } = req.body;

    // Validate input
    if (!productId && !category && !analyzeAll) {
      return res.status(400).json({
        success: false,
        error: 'Either productId, category, or analyzeAll flag must be provided',
        data: null,
      });
    }

    const input: OptimizationInput = {
      productId,
      category,
      analyzeAll: analyzeAll !== false, // Default to true if not specified
      timeframe: timeframe || 90,
    };

    const result = await StockOptimizationService.analyzeStockOptimization(input);

    // Group results by status for easier consumption
    const groupedResults = {
      overstock: result.results.filter(r => r.status === 'OVERSTOCK'),
      understock: result.results.filter(r => r.status === 'UNDERSTOCK'),
      optimal: result.results.filter(r => r.status === 'OPTIMAL'),
    };

    // Calculate actionable insights
    const insights = {
      criticalActions: result.results.filter(r => 
        r.recommendations.some(rec => rec.priority === 'CRITICAL' || rec.priority === 'HIGH')
      ).length,
      potentialSavings: result.results
        .filter(r => r.status === 'OVERSTOCK')
        .reduce((sum, r) => sum + Math.abs(r.costImpact), 0),
      potentialRevenue: result.results
        .filter(r => r.status === 'UNDERSTOCK')
        .reduce((sum, r) => sum + Math.abs(r.costImpact), 0),
    };

    return res.status(200).json({
      success: true,
      data: {
        analysis: {
          all: result.results,
          grouped: groupedResults,
        },
        summary: result.summary,
        insights,
        meta: {
          analysisDate: new Date().toISOString(),
          timeframe: input.timeframe,
          methodology: 'mock_optimization_v1',
        },
      },
      error: null,
    });
  } catch (error: any) {
    console.error('Create optimization error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate optimization analysis',
      data: null,
    });
  }
}
