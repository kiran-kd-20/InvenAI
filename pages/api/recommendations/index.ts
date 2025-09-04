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
    console.error('Product recommendations API error:', error);
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
 * Query parameters:
 * - productId: specific product ID (optional)
 * - category: product category (optional)
 * - analysisType: cross_sell|upsell|bundling|new_products|all (optional)
 * - customerId: customer ID for personalized recommendations (optional)
 * - timeframe: days to look back for analysis (optional, default 90)
 */
async function handleGetRecommendations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      productId, 
      category, 
      analysisType = 'all',
      customerId,
      timeframe = '90'
    } = req.query;

    // Validate analysis type
    const validTypes = ['cross_sell', 'upsell', 'bundling', 'new_products', 'all'];
    if (!validTypes.includes(analysisType as string)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid analysisType. Must be one of: cross_sell, upsell, bundling, new_products, all',
        data: null,
      });
    }

    const recommendationInput: RecommendationInput = {
      productId: productId as string,
      category: category as string,
      analysisType: analysisType as 'cross_sell' | 'upsell' | 'bundling' | 'new_products' | 'all',
      customerId: customerId as string,
      orderHistory: true,
      timeframe: parseInt(timeframe as string) || 90,
    };

    const recommendations = await ProductRecommendationService.generateRecommendations(recommendationInput);

    return res.status(200).json({
      success: true,
      data: {
        ...recommendations,
        metadata: {
          generatedAt: new Date().toISOString(),
          analysisType: recommendationInput.analysisType,
          timeframeDays: recommendationInput.timeframe,
          filters: {
            productId: recommendationInput.productId || null,
            category: recommendationInput.category || null,
            customerId: recommendationInput.customerId || null,
          },
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate product recommendations',
      data: null,
    });
  }
}

/**
 * POST /api/recommendations
 * Create custom product recommendations
 */
async function handleCreateRecommendations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const recommendationInput: RecommendationInput = req.body;

    const recommendations = await ProductRecommendationService.generateRecommendations(recommendationInput);

    return res.status(201).json({
      success: true,
      data: {
        ...recommendations,
        metadata: {
          generatedAt: new Date().toISOString(),
          analysisType: recommendationInput.analysisType,
          timeframeDays: recommendationInput.timeframe,
          filters: {
            productId: recommendationInput.productId || null,
            category: recommendationInput.category || null,
            customerId: recommendationInput.customerId || null,
          },
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Create recommendations error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create product recommendations',
      data: null,
    });
  }
}
