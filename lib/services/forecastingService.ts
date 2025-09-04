import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ForecastingInput {
  productId?: string;
  category?: string;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  forecastPeriod: number; // Number of periods to forecast
  includeSeasonal?: boolean;
  includeExternalFactors?: boolean;
}

export interface SalesData {
  date: string;
  quantity: number;
  revenue: number;
  productId: string;
}

export interface SeasonalFactor {
  period: string;
  multiplier: number;
  confidence: number;
}

export interface ExternalFactor {
  factor: string;
  impact: number;
  date: string;
}

export interface ForecastResult {
  productId: string;
  productName: string;
  forecastData: {
    period: string;
    predictedDemand: number;
    confidence: number;
    lowerBound: number;
    upperBound: number;
  }[];
  seasonalFactors?: SeasonalFactor[];
  externalFactors?: ExternalFactor[];
  accuracy: number;
  methodology: string;
}

class ForecastingService {
  /**
   * Generate demand forecast for products based on historical sales data
   */
  static async generateDemandForecast(input: ForecastingInput): Promise<ForecastResult[]> {
    const { productId, category, timeframe, forecastPeriod, includeSeasonal, includeExternalFactors } = input;

    try {
      // Get historical sales data
      const historicalData = await this.getHistoricalSalesData(productId, category, timeframe);
      
      // Apply forecasting algorithm
      const forecasts: ForecastResult[] = [];

      for (const product of historicalData) {
        const forecast = await this.calculateForecast(
          product,
          timeframe,
          forecastPeriod,
          includeSeasonal,
          includeExternalFactors
        );
        forecasts.push(forecast);
      }

      return forecasts;
    } catch (error) {
      console.error('Forecasting error:', error);
      throw new Error('Failed to generate demand forecast');
    }
  }

  /**
   * Get historical sales data from database
   */
  private static async getHistoricalSalesData(productId?: string, category?: string, timeframe?: string) {
    // Mock data - In real implementation, this would query Prisma/PostgreSQL
    const mockProducts = [
      {
        id: 'prod_1',
        name: 'Product A',
        category: 'Electronics',
        salesHistory: this.generateMockSalesData('2023-01-01', 365)
      },
      {
        id: 'prod_2', 
        name: 'Product B',
        category: 'Clothing',
        salesHistory: this.generateMockSalesData('2023-01-01', 365)
      }
    ];

    return productId 
      ? mockProducts.filter(p => p.id === productId)
      : category 
      ? mockProducts.filter(p => p.category === category)
      : mockProducts;
  }

  /**
   * Calculate forecast using time series analysis
   */
  private static async calculateForecast(
    product: any,
    timeframe: string,
    periods: number,
    includeSeasonal?: boolean,
    includeExternal?: boolean
  ): Promise<ForecastResult> {
    const salesData = product.salesHistory;
    const forecastData = [];

    // Simple moving average with trend analysis
    const windowSize = Math.min(30, Math.floor(salesData.length / 4));
    const recentData = salesData.slice(-windowSize);
    const avgDemand = recentData.reduce((sum, d) => sum + d.quantity, 0) / windowSize;
    
    // Calculate trend
    const trend = this.calculateTrend(recentData);
    
    // Generate forecast periods
    for (let i = 1; i <= periods; i++) {
      const baseDate = new Date();
      baseDate.setDate(baseDate.getDate() + (i * this.getPeriodDays(timeframe)));
      
      let predictedDemand = avgDemand + (trend * i);
      
      // Apply seasonal factors if requested
      if (includeSeasonal) {
        const seasonalMultiplier = this.getSeasonalMultiplier(baseDate, timeframe);
        predictedDemand *= seasonalMultiplier;
      }
      
      // Apply external factors if requested
      if (includeExternal) {
        const externalImpact = this.getExternalFactorImpact(baseDate);
        predictedDemand *= (1 + externalImpact);
      }
      
      // Ensure positive demand
      predictedDemand = Math.max(0, Math.round(predictedDemand));
      
      const confidence = Math.max(0.6, 0.9 - (i * 0.05)); // Decreasing confidence over time
      const variance = predictedDemand * (1 - confidence) * 0.5;
      
      forecastData.push({
        period: baseDate.toISOString().split('T')[0],
        predictedDemand,
        confidence,
        lowerBound: Math.max(0, Math.round(predictedDemand - variance)),
        upperBound: Math.round(predictedDemand + variance)
      });
    }

    return {
      productId: product.id,
      productName: product.name,
      forecastData,
      seasonalFactors: includeSeasonal ? this.getSeasonalFactors(timeframe) : undefined,
      externalFactors: includeExternal ? this.getExternalFactors() : undefined,
      accuracy: 0.85, // Mock accuracy score
      methodology: 'Moving Average with Trend Analysis'
    };
  }

  /**
   * Calculate trend from historical data
   */
  private static calculateTrend(data: SalesData[]): number {
    if (data.length < 2) return 0;
    
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, d) => sum + d.quantity, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, d) => sum + d.quantity, 0) / secondHalf.length;
    
    return (secondAvg - firstAvg) / firstHalf.length;
  }

  /**
   * Get seasonal multiplier based on date and timeframe
   */
  private static getSeasonalMultiplier(date: Date, timeframe: string): number {
    const month = date.getMonth();
    const seasonalPatterns = {
      // Higher demand in Q4 (holiday season)
      0: 0.9,  // Jan
      1: 0.85, // Feb
      2: 0.95, // Mar
      3: 1.0,  // Apr
      4: 1.05, // May
      5: 1.1,  // Jun
      6: 1.15, // Jul
      7: 1.1,  // Aug
      8: 1.05, // Sep
      9: 1.2,  // Oct
      10: 1.3, // Nov
      11: 1.4  // Dec
    };
    
    return seasonalPatterns[month] || 1.0;
  }

  /**
   * Get external factor impact
   */
  private static getExternalFactorImpact(date: Date): number {
    // Mock external factors (holidays, events, economic indicators)
    const month = date.getMonth();
    const day = date.getDate();
    
    // Black Friday impact
    if (month === 10 && day >= 25) return 0.5; // 50% increase
    // Christmas impact  
    if (month === 11 && day >= 20) return 0.3; // 30% increase
    // Back to school
    if (month === 7 && day >= 15) return 0.2; // 20% increase
    
    return 0; // No external impact
  }

  /**
   * Get seasonal factors for reporting
   */
  private static getSeasonalFactors(timeframe: string): SeasonalFactor[] {
    return [
      { period: 'Q1', multiplier: 0.9, confidence: 0.8 },
      { period: 'Q2', multiplier: 1.05, confidence: 0.85 },
      { period: 'Q3', multiplier: 1.1, confidence: 0.9 },
      { period: 'Q4', multiplier: 1.3, confidence: 0.95 }
    ];
  }

  /**
   * Get external factors for reporting
   */
  private static getExternalFactors(): ExternalFactor[] {
    return [
      { factor: 'Holiday Season', impact: 0.3, date: '2024-11-01' },
      { factor: 'Back to School', impact: 0.2, date: '2024-08-15' },
      { factor: 'Economic Growth', impact: 0.1, date: '2024-01-01' }
    ];
  }

  /**
   * Get number of days per period
   */
  private static getPeriodDays(timeframe: string): number {
    switch (timeframe) {
      case 'daily': return 1;
      case 'weekly': return 7;
      case 'monthly': return 30;
      case 'quarterly': return 90;
      default: return 1;
    }
  }

  /**
   * Generate mock sales data for testing
   */
  private static generateMockSalesData(startDate: string, days: number): SalesData[] {
    const data: SalesData[] = [];
    const start = new Date(startDate);
    
    for (let i = 0; i < days; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      
      // Generate realistic sales data with seasonality
      const baseQuantity = 50;
      const seasonal = this.getSeasonalMultiplier(date, 'daily');
      const randomVariation = 0.8 + (Math.random() * 0.4); // ±20% variation
      
      data.push({
        date: date.toISOString().split('T')[0],
        quantity: Math.round(baseQuantity * seasonal * randomVariation),
        revenue: Math.round(baseQuantity * seasonal * randomVariation * 25.99),
        productId: 'prod_1'
      });
    }
    
    return data;
  }
}

export default ForecastingService;
