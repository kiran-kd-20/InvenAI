import { NextApiRequest, NextApiResponse } from 'next';
import ForecastingService, { ForecastingInput } from '../../../lib/services/forecastingService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetForecast(req, res);
        break;
      case 'POST':
        await handleCreateForecast(req, res);
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
    console.error('Demand forecasting API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: null,
    });
  }
}

/**
 * GET /api/forecasting
 * Get demand forecast for products
 * Query parameters:
 * - productId: specific product ID (optional)
 * - category: product category (optional)  
 * - timeframe: daily|weekly|monthly|quarterly (required)
 * - periods: number of periods to forecast (required)
 * - seasonal: include seasonal factors (optional)
 * - external: include external factors (optional)
 */
async function handleGetForecast(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      productId, 
      category, 
      timeframe = 'monthly',
      periods = '6',
      seasonal = 'true',
      external = 'true'
    } = req.query;

    // Validate required parameters
    if (!timeframe || !periods) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: timeframe and periods',
        data: null,
      });
    }

    // Validate timeframe
    const validTimeframes = ['daily', 'weekly', 'monthly', 'quarterly'];
    if (!validTimeframes.includes(timeframe as string)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid timeframe. Must be one of: daily, weekly, monthly, quarterly',
        data: null,
      });
    }

    const forecastInput: ForecastingInput = {
      productId: productId as string,
      category: category as string,
      timeframe: timeframe as 'daily' | 'weekly' | 'monthly' | 'quarterly',
      forecastPeriod: parseInt(periods as string),
      includeSeasonal: seasonal === 'true',
      includeExternalFactors: external === 'true',
    };

    const forecasts = await ForecastingService.generateDemandForecast(forecastInput);

    return res.status(200).json({
      success: true,
      data: {
        forecasts,
        metadata: {
          timeframe: forecastInput.timeframe,
          periods: forecastInput.forecastPeriod,
          includesSeasonal: forecastInput.includeSeasonal,
          includesExternal: forecastInput.includeExternalFactors,
          generatedAt: new Date().toISOString(),
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Get forecast error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate demand forecast',
      data: null,
    });
  }
}

/**
 * POST /api/forecasting
 * Create custom demand forecast with specific parameters
 */
async function handleCreateForecast(req: NextApiRequest, res: NextApiResponse) {
  try {
    const forecastInput: ForecastingInput = req.body;

    // Validate input
    if (!forecastInput.timeframe || !forecastInput.forecastPeriod) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: timeframe and forecastPeriod',
        data: null,
      });
    }

    const forecasts = await ForecastingService.generateDemandForecast(forecastInput);

    return res.status(201).json({
      success: true,
      data: {
        forecasts,
        metadata: {
          timeframe: forecastInput.timeframe,
          periods: forecastInput.forecastPeriod,
          includesSeasonal: forecastInput.includeSeasonal,
          includesExternal: forecastInput.includeExternalFactors,
          generatedAt: new Date().toISOString(),
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('Create forecast error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create demand forecast',
      data: null,
    });
  }
}
