import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ReplenishmentInput {
  productId?: string;
  category?: string;
  urgencyLevel?: 'low' | 'medium' | 'high' | 'critical';
  autoTrigger?: boolean;
}

export interface StockTrigger {
  productId: string;
  currentStock: number;
  reorderPoint: number;
  maxStock: number;
  safetyStock: number;
  triggerType: 'reorder_point' | 'max_min' | 'time_based' | 'demand_forecast';
}

export interface ReorderLogic {
  productId: string;
  productName: string;
  category: string;
  currentStock: number;
  reorderQuantity: number;
  reorderPoint: number;
  leadTime: number; // in days
  averageDailyDemand: number;
  safetyStock: number;
  supplierInfo: {
    supplierId: string;
    supplierName: string;
    unitCost: number;
    minimumOrderQuantity: number;
    leadTimeDays: number;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  recommendedAction: 'order_now' | 'order_soon' | 'monitor' | 'overstock';
}

export interface ReplenishmentOrder {
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  supplierId: string;
  supplierName: string;
  unitCost: number;
  totalCost: number;
  expectedDelivery: string;
  status: 'pending' | 'sent' | 'confirmed' | 'in_transit' | 'delivered';
  priority: string;
  createdAt: string;
}

export interface ReplenishmentResult {
  triggeredProducts: ReorderLogic[];
  ordersToPlace: ReplenishmentOrder[];
  summary: {
    totalProducts: number;
    criticalItems: number;
    totalOrderValue: number;
    averageLeadTime: number;
  };
}

class ReplenishmentService {
  /**
   * Analyze stock levels and generate replenishment recommendations
   */
  static async analyzeReplenishment(input: ReplenishmentInput): Promise<ReplenishmentResult> {
    const { productId, category, urgencyLevel, autoTrigger } = input;

    try {
      // Get current inventory data
      const inventoryData = await this.getCurrentInventory(productId, category);
      
      // Analyze each product for replenishment needs
      const triggeredProducts: ReorderLogic[] = [];
      const ordersToPlace: ReplenishmentOrder[] = [];

      for (const product of inventoryData) {
        const reorderLogic = await this.calculateReorderLogic(product);
        
        // Check if replenishment is needed
        if (this.shouldTriggerReplenishment(reorderLogic, urgencyLevel)) {
          triggeredProducts.push(reorderLogic);
          
          // If auto-trigger is enabled, create order
          if (autoTrigger && reorderLogic.recommendedAction === 'order_now') {
            const order = await this.createReplenishmentOrder(reorderLogic);
            ordersToPlace.push(order);
          }
        }
      }

      // Generate summary
      const summary = this.generateSummary(triggeredProducts, ordersToPlace);

      return {
        triggeredProducts,
        ordersToPlace,
        summary
      };
    } catch (error) {
      console.error('Replenishment analysis error:', error);
      throw new Error('Failed to analyze replenishment needs');
    }
  }

  /**
   * Trigger automatic replenishment for specific products
   */
  static async triggerReplenishment(productIds: string[]): Promise<ReplenishmentOrder[]> {
    try {
      const orders: ReplenishmentOrder[] = [];

      for (const productId of productIds) {
        const inventoryData = await this.getCurrentInventory(productId);
        if (inventoryData.length > 0) {
          const product = inventoryData[0];
          const reorderLogic = await this.calculateReorderLogic(product);
          
          if (reorderLogic.recommendedAction === 'order_now') {
            const order = await this.createReplenishmentOrder(reorderLogic);
            orders.push(order);
          }
        }
      }

      return orders;
    } catch (error) {
      console.error('Trigger replenishment error:', error);
      throw new Error('Failed to trigger replenishment');
    }
  }

  /**
   * Get current inventory data
   */
  private static async getCurrentInventory(productId?: string, category?: string) {
    // Mock inventory data - In real implementation, query from Prisma/PostgreSQL
    const mockInventory = [
      {
        id: 'prod_1',
        name: 'Laptop Pro 15"',
        category: 'Electronics',
        currentStock: 25,
        reservedStock: 5,
        availableStock: 20,
        reorderPoint: 30,
        maxStock: 100,
        safetyStock: 15,
        unitCost: 899.99,
        averageDailyDemand: 2.5,
        leadTimeDays: 7,
        supplierId: 'sup_1',
        supplierName: 'Tech Solutions Inc',
        minimumOrderQuantity: 10
      },
      {
        id: 'prod_2',
        name: 'Wireless Mouse',
        category: 'Accessories',
        currentStock: 5,
        reservedStock: 2,
        availableStock: 3,
        reorderPoint: 20,
        maxStock: 200,
        safetyStock: 10,
        unitCost: 29.99,
        averageDailyDemand: 8,
        leadTimeDays: 3,
        supplierId: 'sup_2',
        supplierName: 'Peripheral Plus',
        minimumOrderQuantity: 25
      },
      {
        id: 'prod_3',
        name: 'Office Chair',
        category: 'Furniture',
        currentStock: 45,
        reservedStock: 0,
        availableStock: 45,
        reorderPoint: 15,
        maxStock: 50,
        safetyStock: 5,
        unitCost: 199.99,
        averageDailyDemand: 1.2,
        leadTimeDays: 14,
        supplierId: 'sup_3',
        supplierName: 'Office Furniture Co',
        minimumOrderQuantity: 5
      }
    ];

    let filtered = mockInventory;

    if (productId) {
      filtered = filtered.filter(item => item.id === productId);
    }

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    return filtered;
  }

  /**
   * Calculate reorder logic for a product
   */
  private static async calculateReorderLogic(product: any): Promise<ReorderLogic> {
    const {
      id, name, category, currentStock, reorderPoint, maxStock, safetyStock,
      unitCost, averageDailyDemand, leadTimeDays, supplierId, supplierName, minimumOrderQuantity
    } = product;

    // Calculate optimal reorder quantity (Economic Order Quantity simplified)
    const demandDuringLeadTime = averageDailyDemand * leadTimeDays;
    const reorderQuantity = Math.max(
      minimumOrderQuantity,
      Math.ceil((maxStock - currentStock) / minimumOrderQuantity) * minimumOrderQuantity
    );

    // Determine priority based on stock level
    let priority: 'low' | 'medium' | 'high' | 'critical';
    let recommendedAction: 'order_now' | 'order_soon' | 'monitor' | 'overstock';

    if (currentStock <= safetyStock) {
      priority = 'critical';
      recommendedAction = 'order_now';
    } else if (currentStock <= reorderPoint) {
      priority = 'high';
      recommendedAction = 'order_now';
    } else if (currentStock <= reorderPoint * 1.5) {
      priority = 'medium';
      recommendedAction = 'order_soon';
    } else if (currentStock >= maxStock * 0.9) {
      priority = 'low';
      recommendedAction = 'overstock';
    } else {
      priority = 'low';
      recommendedAction = 'monitor';
    }

    return {
      productId: id,
      productName: name,
      category,
      currentStock,
      reorderQuantity,
      reorderPoint,
      leadTime: leadTimeDays,
      averageDailyDemand,
      safetyStock,
      supplierInfo: {
        supplierId,
        supplierName,
        unitCost,
        minimumOrderQuantity,
        leadTimeDays
      },
      priority,
      recommendedAction
    };
  }

  /**
   * Check if replenishment should be triggered
   */
  private static shouldTriggerReplenishment(reorderLogic: ReorderLogic, urgencyLevel?: string): boolean {
    const { recommendedAction, priority } = reorderLogic;
    
    // Always include critical and high priority items
    if (priority === 'critical' || priority === 'high') {
      return true;
    }

    // Include medium priority if urgency level allows
    if (priority === 'medium' && urgencyLevel !== 'high') {
      return true;
    }

    // Include low priority items only for comprehensive analysis
    if (priority === 'low' && urgencyLevel === 'low') {
      return true;
    }

    return false;
  }

  /**
   * Create replenishment order
   */
  private static async createReplenishmentOrder(reorderLogic: ReorderLogic): Promise<ReplenishmentOrder> {
    const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expectedDelivery = new Date();
    expectedDelivery.setDate(expectedDelivery.getDate() + reorderLogic.leadTime);

    const totalCost = reorderLogic.reorderQuantity * reorderLogic.supplierInfo.unitCost;

    return {
      orderId,
      productId: reorderLogic.productId,
      productName: reorderLogic.productName,
      quantity: reorderLogic.reorderQuantity,
      supplierId: reorderLogic.supplierInfo.supplierId,
      supplierName: reorderLogic.supplierInfo.supplierName,
      unitCost: reorderLogic.supplierInfo.unitCost,
      totalCost,
      expectedDelivery: expectedDelivery.toISOString().split('T')[0],
      status: 'pending',
      priority: reorderLogic.priority,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Generate summary statistics
   */
  private static generateSummary(triggeredProducts: ReorderLogic[], ordersToPlace: ReplenishmentOrder[]) {
    const criticalItems = triggeredProducts.filter(p => p.priority === 'critical').length;
    const totalOrderValue = ordersToPlace.reduce((sum, order) => sum + order.totalCost, 0);
    const averageLeadTime = triggeredProducts.length > 0 
      ? triggeredProducts.reduce((sum, p) => sum + p.leadTime, 0) / triggeredProducts.length 
      : 0;

    return {
      totalProducts: triggeredProducts.length,
      criticalItems,
      totalOrderValue: Math.round(totalOrderValue * 100) / 100,
      averageLeadTime: Math.round(averageLeadTime * 10) / 10
    };
  }
}

export default ReplenishmentService;
