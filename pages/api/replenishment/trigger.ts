import { NextApiRequest, NextApiResponse } from 'next';
import ReplenishmentService from '../../../lib/services/replenishmentService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        await handleTriggerReplenishment(req, res);
        break;
      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
          success: false,
          error: `Method ${req.method} not allowed`,
          data: null,
        });
    }
  } catch (error) {
    console.error('Replenishment trigger API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: null,
    });
  }
}

/**
 * POST /api/replenishment/trigger
 * Trigger automated replenishment order
 */
async function handleTriggerReplenishment(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { replenishmentId, autoApprove = false } = req.body;

    if (!replenishmentId) {
      return res.status(400).json({
        success: false,
        error: 'Replenishment ID is required',
        data: null,
      });
    }

    const result = await ReplenishmentService.triggerReplenishmentOrder(
      replenishmentId,
      autoApprove
    );

    return res.status(200).json({
      success: true,
      data: {
        message: 'Replenishment order triggered successfully',
        replenishment: result,
      },
      error: null,
    });
  } catch (error: any) {
    console.error('Trigger replenishment error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to trigger replenishment order',
      data: null,
    });
  }
}
