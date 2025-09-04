import { NextApiRequest, NextApiResponse } from 'next';
import ReplenishmentService, { ReplenishmentInput } from '../../../lib/services/replenishmentService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetReplenishment(req, res);
        break;
      case 'POST':
        await handleCreateReplenishment(req, res);
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
    console.error('Replenishment API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: null,
    });
  }
}

/**
 * GET /api/replenishment
 * Analyze products and get replenishment recommendations
 * Query parameters:
 * - productId: specific product ID (optional)
 * - category: product category (optional)
 * - urgency: low|medium|high|critical (optional)
 * - autoTrigger: true|false (optional)
 */
async function handleGetReplenishment(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      productId, 
      category, 
      urgency = 'medium',
      autoTrigger = 'false'
    } = req.query;

    const replenishmentInput: ReplenishmentInput = {
      productId: productId as string,
      category: category as string,
      urgencyLevel: urgency as 'low' | 'medium' | 'high' | 'critical',
      autoTrigger: autoTrigger === 'true',
    };

    const result = await ReplenishmentService.analyzeReplenishment(replenishmentInput);

    return res.status(200).json({
      success: true,
      data: {
        ...result,
        metadata: {
          analysisDate: new Date().toISOString(),
          urgencyLevel: replenishmentInput.urgencyLevel,
          autoTriggerEnabled: replenishmentInput.autoTrigger,
          filters: {
            productId: replenishmentInput.productId || null,
            category: replenishmentInput.category || null,
          },
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Get replenishment error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to analyze replenishment needs',
      data: null,
    });
  }
}

/**
 * POST /api/replenishment
 * Create replenishment analysis with custom parameters
 */
async function handleCreateReplenishment(req: NextApiRequest, res: NextApiResponse) {
  try {
    const replenishmentInput: ReplenishmentInput = req.body;

    const result = await ReplenishmentService.analyzeReplenishment(replenishmentInput);

    return res.status(201).json({
      success: true,
      data: {
        ...result,
        metadata: {
          analysisDate: new Date().toISOString(),
          urgencyLevel: replenishmentInput.urgencyLevel,
          autoTriggerEnabled: replenishmentInput.autoTrigger,
          filters: {
            productId: replenishmentInput.productId || null,
            category: replenishmentInput.category || null,
          },
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Create replenishment error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create replenishment analysis',
      data: null,
    });
  }
}
