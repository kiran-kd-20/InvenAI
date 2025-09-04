import { NextApiRequest, NextApiResponse } from 'next';
import ProductRecommendationService, { RecommendationInput } from '../../../lib/services/productRecommendationService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetRecommendations(req, res);
        break;
      case 'POST':
        await handleCreateRecommendations(req, res);
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
    console.error('Recommendations API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: null,
    });
  }
}

/**
 * GET /api/recommendations
 * Get product recommendations
 */
async function handleGetRecommendations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      productId, 
      category, 
      analysisType, 
      timeframe,
      type // Filter by recommendation type
    } = req.query;

    const input: RecommendationInput = {
      ...(productId && { productId: productId as string }),
      ...(category && { category: category as string }),
      ...(analysisType && { 
        analysisType: analysisType as 'cross_sell' | 'upsell' | 'bundling' | 'new_products' | 'all' 
      }),
      ...(timeframe && { timeframe: parseInt(timeframe as string) }),
    };

    const recommendations = await ProductRecommendationService.generateRecommendations(input);

    // Filter by type if specified
    let filteredGeneral = recommendations.general;
    if (type) {
      filteredGeneral = recommendations.general.filter(r => 
        r.type.toLowerCase() === type.toString().toLowerCase()
      );
    }

    // Format response based on analysis type
    let responseData: any = {
      summary: recommendations.summary,
      meta: {
        analysisType: input.analysisType || 'all',
        timeframe: input.timeframe || 90,
        filters: { productId, category, type },
      },
    };

    if (!analysisType || analysisType === 'all') {
      responseData.recommendations = {
        general: filteredGeneral,
        crossSell: recommendations.crossSell,
        bundles: recommendations.bundles,
        upsell: recommendations.upsell,
      };
    } else {
      switch (analysisType) {
        case 'cross_sell':
          responseData.crossSell = recommendations.crossSell;
          break;
        case 'bundling':
          responseData.bundles = recommendations.bundles;
          break;
        case 'upsell':
          responseData.upsell = recommendations.upsell;
          break;
        case 'new_products':
          responseData.general = filteredGeneral;
          break;
      }
    }

    return res.status(200).json({
      success: true,
      data: responseData,
      error: null,
    });
  } catch (error: any) {
    console.error('Get recommendations error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve recommendations',
      data: null,
    });
  }
}

/**
 * POST /api/recommendations
 * Generate new product recommendations
 */
async function handleCreateRecommendations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { productId, category, analysisType, timeframe } = req.body;

    // Validate analysis type if provided
    const validAnalysisTypes = ['cross_sell', 'upsell', 'bundling', 'new_products', 'all'];
    if (analysisType && !validAnalysisTypes.includes(analysisType)) {
      return res.status(400).json({
        success: false,
        error: `Invalid analysis type. Must be one of: ${validAnalysisTypes.join(', ')}`,
        data: null,
      });
    }

    const input: RecommendationInput = {
      productId,
      category,
      analysisType: analysisType || 'all',
      timeframe: timeframe || 90,
    };

    const result = await ProductRecommendationService.generateRecommendations(input);

    // Calculate additional insights
    const insights = {
      topOpportunities: [
        ...result.crossSell.map(cs => ({
          type: 'cross_sell',
          productId: cs.productId,
          productName: cs.productName,
          potential: cs.recommendedProducts.reduce((sum, rp) => sum + rp.revenue_potential, 0),
        })),
        ...result.bundles.map(bundle => ({
          type: 'bundle',
          bundleId: bundle.bundleId,
          name: bundle.name,
          potential: bundle.savings * 10, // Estimate monthly impact
        })),
      ].sort((a, b) => b.potential - a.potential).slice(0, 5),
      
      crossSellOpportunities: result.crossSell.length,
      bundleOpportunities: result.bundles.length,
      upsellOpportunities: result.upsell.length,
    };

    return res.status(200).json({
      success: true,
      data: {
        recommendations: {
          general: result.general,
          crossSell: result.crossSell,
          bundles: result.bundles,
          upsell: result.upsell,
        },
        summary: result.summary,
        insights,
        meta: {
          generatedAt: new Date().toISOString(),
          analysisType: input.analysisType,
          timeframe: input.timeframe,
          methodology: 'mock_recommendation_v1',
        },
      },
      error: null,
    });
  } catch (error: any) {
    console.error('Create recommendations error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate recommendations',
      data: null,
    });
  }
}
