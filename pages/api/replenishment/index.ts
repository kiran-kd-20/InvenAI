import { NextApiRequest, NextApiResponse } from 'next';
import ReplenishmentService, { ReplenishmentInput } from '../../../lib/services/replenishmentService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetReplenishmentSuggestions(req, res);
        break;
      case 'POST':
        await handleCreateReplenishmentSuggestions(req, res);
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
 * Get existing replenishment suggestions
 */
async function handleGetReplenishmentSuggestions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { productId, urgency } = req.query;

    const input: ReplenishmentInput = {
      ...(productId && { productId: productId as string }),
      checkAllProducts: !productId,
    };

    const suggestions = await ReplenishmentService.generateReplenishmentSuggestions(input);

    // Filter by urgency if specified
    let filteredSuggestions = suggestions.suggestions;
    if (urgency) {
      filteredSuggestions = suggestions.suggestions.filter(
        s => s.urgencyLevel === urgency.toString().toUpperCase()
      );
    }

    return res.status(200).json({
      success: true,
      data: {
        suggestions: filteredSuggestions,
        summary: {
          ...suggestions.summary,
          filteredCount: filteredSuggestions.length,
        },
      },
      error: null,
    });
  } catch (error: any) {
    console.error('Get replenishment suggestions error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve replenishment suggestions',
      data: null,
    });
  }
}

/**
 * POST /api/replenishment
 * Generate new replenishment suggestions
 */
async function handleCreateReplenishmentSuggestions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { productId, checkAllProducts, urgencyThreshold } = req.body;

    const input: ReplenishmentInput = {
      productId,
      checkAllProducts: checkAllProducts !== false, // Default to true
      urgencyThreshold,
    };

    const result = await ReplenishmentService.generateReplenishmentSuggestions(input);

    return res.status(200).json({
      success: true,
      data: result,
      error: null,
    });
  } catch (error: any) {
    console.error('Create replenishment suggestions error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate replenishment suggestions',
      data: null,
    });
  }
}
