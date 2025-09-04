import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface OptimizationInput {
  productId?: string;
  category?: string;
  timeframe?: 'weekly' | 'monthly' | 'quarterly';
  analysisType?: 'abc' | 'xyz' | 'turnover' | 'carrying_cost' | 'all';
}

export interface ABCAnalysis {
  productId: string;
  productName: string;
  category: string;
  annualValue: number;
  classification: 'A' | 'B' | 'C';
  percentage: number;
  cumulativePercentage: number;
  recommendedStockLevel: 'high' | 'medium' | 'low';
}

export interface XYZAnalysis {
  productId: string;
  productName: string;
  demandVariability: 'low' | 'medium' | 'high';
  classification: 'X' | 'Y' | 'Z';
  coefficientOfVariation: number;
  forecastAccuracy: number;
  recommendedSafetyStock: number;
}

export interface TurnoverAnalysis {
  productId: string;
  productName: string;
  turnoverRate: number;
  daysInStock: number;
  classification: 'fast' | 'medium' | 'slow';
  recommendation: string;
}

export interface CarryingCostAnalysis {
  productId: string;
  productName: string;
  averageInventoryValue: number;
  carryingCostPercentage: number;
  annualCarryingCost: number;
  opportunityCost: number;
  totalCost: number;
  recommendation: string;
}

export interface OptimizationResult {
  summary: {
    totalProducts: number;
    totalInventoryValue: number;
    potentialSavings: number;
    improvementOpportunities: number;
  };
  abcAnalysis?: ABCAnalysis[];
  xyzAnalysis?: XYZAnalysis[];
  turnoverAnalysis?: TurnoverAnalysis[];
  carryingCostAnalysis?: CarryingCostAnalysis[];
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    action: string;
    expectedImpact: string;
    timeframe: string;
  }[];
}

class StockOptimizationService {
  /**
   * Perform comprehensive stock optimization analysis
   */
  static async analyzeStockOptimization(input: OptimizationInput): Promise<OptimizationResult> {
    const { productId, category, timeframe = 'monthly', analysisType = 'all' } = input;

    try {
      // Get inventory and sales data
      const inventoryData = await this.getInventoryData(productId, category);
      const salesData = await this.getSalesData(productId, category, timeframe);
      
      const result: OptimizationResult = {
        summary: {
          totalProducts: inventoryData.length,
          totalInventoryValue: 0,
          potentialSavings: 0,
          improvementOpportunities: 0
        },
        recommendations: []
      };

      // Perform requested analyses
      if (analysisType === 'abc' || analysisType === 'all') {
        result.abcAnalysis = await this.performABCAnalysis(inventoryData, salesData);
      }

      if (analysisType === 'xyz' || analysisType === 'all') {
        result.xyzAnalysis = await this.performXYZAnalysis(inventoryData, salesData);
      }

      if (analysisType === 'turnover' || analysisType === 'all') {
        result.turnoverAnalysis = await this.performTurnoverAnalysis(inventoryData, salesData);
      }

      if (analysisType === 'carrying_cost' || analysisType === 'all') {
        result.carryingCostAnalysis = await this.performCarryingCostAnalysis(inventoryData);
      }

      // Calculate summary and recommendations
      result.summary = this.calculateSummary(result);
      result.recommendations = this.generateRecommendations(result);

      return result;
    } catch (error) {
      console.error('Stock optimization error:', error);
      throw new Error('Failed to perform stock optimization analysis');
    }
  }

  /**
   * Get ABC Analysis - categorizes inventory by value
   */
  static async getABCAnalysis(): Promise<ABCAnalysis[]> {
    const inventoryData = await this.getInventoryData();
    const salesData = await this.getSalesData();
    return this.performABCAnalysis(inventoryData, salesData);
  }

  /**
   * Get inventory data from database
   */
  private static async getInventoryData(productId?: string, category?: string) {
    // Mock inventory data - In real implementation, query from Prisma/PostgreSQL
    const mockData = [
      {
        id: 'prod_1',
        name: 'Premium Laptop',
        category: 'Electronics',
        currentStock: 45,
        unitCost: 899.99,
        sellingPrice: 1299.99,
        averageMonthlyDemand: 15,
        leadTimeDays: 7,
        carryingCostRate: 0.25
      },
      {
        id: 'prod_2', 
        name: 'Wireless Mouse',
        category: 'Accessories',
        currentStock: 200,
        unitCost: 25.99,
        sellingPrice: 39.99,
        averageMonthlyDemand: 80,
        leadTimeDays: 3,
        carryingCostRate: 0.20
      },
      {
        id: 'prod_3',
        name: 'Office Chair',
        category: 'Furniture',
        currentStock: 25,
        unitCost: 199.99,
        sellingPrice: 349.99,
        averageMonthlyDemand: 8,
        leadTimeDays: 14,
        carryingCostRate: 0.30
      },
      {
        id: 'prod_4',
        name: 'Monitor Stand',
        category: 'Accessories',
        currentStock: 60,
        unitCost: 49.99,
        sellingPrice: 79.99,
        averageMonthlyDemand: 25,
        leadTimeDays: 5,
        carryingCostRate: 0.22
      },
      {
        id: 'prod_5',
        name: 'Gaming Keyboard',
        category: 'Electronics',
        currentStock: 35,
        unitCost: 89.99,
        sellingPrice: 149.99,
        averageMonthlyDemand: 12,
        leadTimeDays: 4,
        carryingCostRate: 0.18
      }
    ];

    let filtered = mockData;

    if (productId) {
      filtered = filtered.filter(item => item.id === productId);
    }

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    return filtered;
  }

  /**
   * Get sales data from database
   */
  private static async getSalesData(productId?: string, category?: string, timeframe: string = 'monthly') {
    // Mock sales data
    const mockSalesData = [
      { productId: 'prod_1', monthlySales: [18, 22, 15, 12, 20, 16, 14, 19, 21, 17, 13, 25] },
      { productId: 'prod_2', monthlySales: [85, 78, 92, 88, 75, 95, 82, 90, 87, 93, 89, 84] },
      { productId: 'prod_3', monthlySales: [6, 8, 10, 7, 9, 5, 8, 12, 6, 7, 9, 11] },
      { productId: 'prod_4', monthlySales: [22, 28, 25, 30, 24, 26, 29, 27, 23, 31, 25, 28] },
      { productId: 'prod_5', monthlySales: [10, 15, 12, 8, 14, 11, 13, 16, 9, 12, 14, 18] }
    ];

    return mockSalesData;
  }

  /**
   * Perform ABC Analysis
   */
  private static async performABCAnalysis(inventoryData: any[], salesData: any[]): Promise<ABCAnalysis[]> {
    const analysis = inventoryData.map(product => {
      const sales = salesData.find(s => s.productId === product.id);
      const annualSales = sales ? sales.monthlySales.reduce((sum: number, month: number) => sum + month, 0) : 0;
      const annualValue = annualSales * product.sellingPrice;

      return {
        productId: product.id,
        productName: product.name,
        category: product.category,
        annualValue,
        classification: 'A' as 'A' | 'B' | 'C', // Will be set after sorting
        percentage: 0, // Will be calculated after sorting
        cumulativePercentage: 0, // Will be calculated after sorting
        recommendedStockLevel: 'high' as 'high' | 'medium' | 'low'
      };
    });

    // Sort by annual value descending
    analysis.sort((a, b) => b.annualValue - a.annualValue);

    // Calculate percentages and classifications
    const totalValue = analysis.reduce((sum, item) => sum + item.annualValue, 0);
    let cumulativeValue = 0;

    analysis.forEach((item, index) => {
      item.percentage = (item.annualValue / totalValue) * 100;
      cumulativeValue += item.annualValue;
      item.cumulativePercentage = (cumulativeValue / totalValue) * 100;

      // ABC Classification: A(80%), B(15%), C(5%)
      if (item.cumulativePercentage <= 80) {
        item.classification = 'A';
        item.recommendedStockLevel = 'high';
      } else if (item.cumulativePercentage <= 95) {
        item.classification = 'B';
        item.recommendedStockLevel = 'medium';
      } else {
        item.classification = 'C';
        item.recommendedStockLevel = 'low';
      }
    });

    return analysis;
  }

  /**
   * Perform XYZ Analysis (demand variability)
   */
  private static async performXYZAnalysis(inventoryData: any[], salesData: any[]): Promise<XYZAnalysis[]> {
    return inventoryData.map(product => {
      const sales = salesData.find(s => s.productId === product.id);
      const monthlySales = sales ? sales.monthlySales : [];
      
      // Calculate coefficient of variation
      const mean = monthlySales.reduce((sum: number, val: number) => sum + val, 0) / monthlySales.length;
      const variance = monthlySales.reduce((sum: number, val: number) => sum + Math.pow(val - mean, 2), 0) / monthlySales.length;
      const stdDev = Math.sqrt(variance);
      const coefficientOfVariation = mean > 0 ? (stdDev / mean) * 100 : 0;

      // XYZ Classification
      let classification: 'X' | 'Y' | 'Z';
      let demandVariability: 'low' | 'medium' | 'high';
      let forecastAccuracy: number;
      let recommendedSafetyStock: number;

      if (coefficientOfVariation <= 20) {
        classification = 'X';
        demandVariability = 'low';
        forecastAccuracy = 95;
        recommendedSafetyStock = mean * 0.1; // 10% of mean demand
      } else if (coefficientOfVariation <= 50) {
        classification = 'Y';
        demandVariability = 'medium';
        forecastAccuracy = 80;
        recommendedSafetyStock = mean * 0.2; // 20% of mean demand
      } else {
        classification = 'Z';
        demandVariability = 'high';
        forecastAccuracy = 60;
        recommendedSafetyStock = mean * 0.35; // 35% of mean demand
      }

      return {
        productId: product.id,
        productName: product.name,
        demandVariability,
        classification,
        coefficientOfVariation: Math.round(coefficientOfVariation * 100) / 100,
        forecastAccuracy,
        recommendedSafetyStock: Math.ceil(recommendedSafetyStock)
      };
    });
  }

  /**
   * Perform Turnover Analysis
   */
  private static async performTurnoverAnalysis(inventoryData: any[], salesData: any[]): Promise<TurnoverAnalysis[]> {
    return inventoryData.map(product => {
      const sales = salesData.find(s => s.productId === product.id);
      const annualSales = sales ? sales.monthlySales.reduce((sum: number, month: number) => sum + month, 0) : 0;
      
      const averageStock = product.currentStock;
      const turnoverRate = annualSales > 0 ? annualSales / averageStock : 0;
      const daysInStock = turnoverRate > 0 ? 365 / turnoverRate : 365;

      let classification: 'fast' | 'medium' | 'slow';
      let recommendation: string;

      if (turnoverRate >= 12) { // Monthly turnover
        classification = 'fast';
        recommendation = 'Maintain lean inventory, frequent replenishment';
      } else if (turnoverRate >= 4) { // Quarterly turnover
        classification = 'medium';
        recommendation = 'Optimize order quantities, monitor demand trends';
      } else {
        classification = 'slow';
        recommendation = 'Consider reducing stock levels, promotional pricing';
      }

      return {
        productId: product.id,
        productName: product.name,
        turnoverRate: Math.round(turnoverRate * 100) / 100,
        daysInStock: Math.round(daysInStock),
        classification,
        recommendation
      };
    });
  }

  /**
   * Perform Carrying Cost Analysis
   */
  private static async performCarryingCostAnalysis(inventoryData: any[]): Promise<CarryingCostAnalysis[]> {
    return inventoryData.map(product => {
      const averageInventoryValue = (product.currentStock * product.unitCost) / 2; // Average inventory
      const carryingCostPercentage = product.carryingCostRate * 100;
      const annualCarryingCost = averageInventoryValue * product.carryingCostRate;
      const opportunityCost = averageInventoryValue * 0.08; // 8% opportunity cost
      const totalCost = annualCarryingCost + opportunityCost;

      let recommendation: string;
      if (carryingCostPercentage > 25) {
        recommendation = 'High carrying costs - consider reducing stock levels';
      } else if (carryingCostPercentage > 20) {
        recommendation = 'Moderate carrying costs - monitor inventory levels';
      } else {
        recommendation = 'Acceptable carrying costs - current levels optimal';
      }

      return {
        productId: product.id,
        productName: product.name,
        averageInventoryValue: Math.round(averageInventoryValue * 100) / 100,
        carryingCostPercentage,
        annualCarryingCost: Math.round(annualCarryingCost * 100) / 100,
        opportunityCost: Math.round(opportunityCost * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        recommendation
      };
    });
  }

  /**
   * Calculate summary statistics
   */
  private static calculateSummary(result: OptimizationResult) {
    const abcData = result.abcAnalysis || [];
    const carryingData = result.carryingCostAnalysis || [];
    const turnoverData = result.turnoverAnalysis || [];

    const totalInventoryValue = abcData.reduce((sum, item) => sum + item.annualValue, 0);
    const potentialSavings = carryingData.reduce((sum, item) => sum + (item.totalCost * 0.15), 0); // 15% potential savings
    const improvementOpportunities = turnoverData.filter(item => item.classification === 'slow').length +
                                   abcData.filter(item => item.classification === 'C').length;

    return {
      totalProducts: abcData.length,
      totalInventoryValue: Math.round(totalInventoryValue * 100) / 100,
      potentialSavings: Math.round(potentialSavings * 100) / 100,
      improvementOpportunities
    };
  }

  /**
   * Generate optimization recommendations
   */
  private static generateRecommendations(result: OptimizationResult) {
    const recommendations = [];

    // ABC Analysis recommendations
    if (result.abcAnalysis) {
      const cItems = result.abcAnalysis.filter(item => item.classification === 'C');
      if (cItems.length > 0) {
        recommendations.push({
          priority: 'high' as 'high',
          action: `Reduce inventory levels for ${cItems.length} Class C items`,
          expectedImpact: 'Reduce carrying costs by 20-30%',
          timeframe: '1-2 months'
        });
      }
    }

    // Turnover Analysis recommendations  
    if (result.turnoverAnalysis) {
      const slowMoving = result.turnoverAnalysis.filter(item => item.classification === 'slow');
      if (slowMoving.length > 0) {
        recommendations.push({
          priority: 'medium' as 'medium',
          action: `Optimize ${slowMoving.length} slow-moving items through promotions or discontinuation`,
          expectedImpact: 'Improve cash flow and reduce storage costs',
          timeframe: '2-3 months'
        });
      }
    }

    // Carrying Cost recommendations
    if (result.carryingCostAnalysis) {
      const highCost = result.carryingCostAnalysis.filter(item => item.carryingCostPercentage > 25);
      if (highCost.length > 0) {
        recommendations.push({
          priority: 'high' as 'high',
          action: `Address high carrying costs for ${highCost.length} products`,
          expectedImpact: 'Reduce annual carrying costs by $' + Math.round(highCost.reduce((sum, item) => sum + item.totalCost * 0.3, 0)),
          timeframe: '1 month'
        });
      }
    }

    return recommendations;
  }
}

export default StockOptimizationService;
