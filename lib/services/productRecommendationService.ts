import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RecommendationInput {
  productId?: string;
  category?: string;
  analysisType?: 'cross_sell' | 'upsell' | 'bundling' | 'new_products' | 'all';
  customerId?: string;
  orderHistory?: boolean;
  timeframe?: number; // Days to look back
}

export interface CrossSellRecommendation {
  productId: string;
  productName: string;
  category: string;
  confidence: number;
  frequency: number;
  averageOrderValue: number;
  reason: string;
}

export interface UpsellRecommendation {
  currentProductId: string;
  recommendedProductId: string;
  currentProductName: string;
  recommendedProductName: string;
  priceDifference: number;
  valueProposition: string;
  confidence: number;
  potentialRevenue: number;
}

export interface BundleRecommendation {
  bundleId: string;
  bundleName: string;
  products: {
    productId: string;
    productName: string;
    price: number;
  }[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  popularity: number;
  confidence: number;
}

export interface NewProductRecommendation {
  productId: string;
  productName: string;
  category: string;
  description: string;
  price: number;
  trendScore: number;
  marketDemand: 'low' | 'medium' | 'high';
  recommendationReason: string;
  confidence: number;
}

export interface RecommendationResult {
  summary: {
    totalRecommendations: number;
    averageConfidence: number;
    estimatedRevenueImpact: number;
    categories: string[];
  };
  crossSell?: CrossSellRecommendation[];
  upsell?: UpsellRecommendation[];
  bundles?: BundleRecommendation[];
  newProducts?: NewProductRecommendation[];
  insights: {
    topCategory: string;
    mostFrequentPair: string;
    averageBasketSize: number;
    seasonalTrends: string[];
  };
}

class ProductRecommendationService {
  /**
   * Generate comprehensive product recommendations
   */
  static async generateRecommendations(input: RecommendationInput): Promise<RecommendationResult> {
    const { 
      productId, 
      category, 
      analysisType = 'all', 
      customerId, 
      orderHistory = true, 
      timeframe = 90 
    } = input;

    try {
      // Get order and product data
      const orderData = await this.getOrderData(customerId, timeframe);
      const productData = await this.getProductData(productId, category);
      const customerData = await this.getCustomerData(customerId);

      const result: RecommendationResult = {
        summary: {
          totalRecommendations: 0,
          averageConfidence: 0,
          estimatedRevenueImpact: 0,
          categories: []
        },
        insights: {
          topCategory: '',
          mostFrequentPair: '',
          averageBasketSize: 0,
          seasonalTrends: []
        }
      };

      // Generate recommendations based on type
      if (analysisType === 'cross_sell' || analysisType === 'all') {
        result.crossSell = await this.generateCrossSellRecommendations(orderData, productData, productId);
      }

      if (analysisType === 'upsell' || analysisType === 'all') {
        result.upsell = await this.generateUpsellRecommendations(productData, orderData, productId);
      }

      if (analysisType === 'bundling' || analysisType === 'all') {
        result.bundles = await this.generateBundleRecommendations(orderData, productData);
      }

      if (analysisType === 'new_products' || analysisType === 'all') {
        result.newProducts = await this.generateNewProductRecommendations(productData, orderData, category);
      }

      // Calculate summary and insights
      result.summary = this.calculateSummary(result);
      result.insights = this.generateInsights(orderData, result);

      return result;
    } catch (error) {
      console.error('Product recommendation error:', error);
      throw new Error('Failed to generate product recommendations');
    }
  }

  /**
   * Get order data for analysis
   */
  private static async getOrderData(customerId?: string, timeframe: number = 90) {
    // Mock order data - In real implementation, query from Prisma/PostgreSQL
    const mockOrders = [
      {
        orderId: 'ord_1',
        customerId: 'cust_1',
        date: '2024-08-15',
        items: [
          { productId: 'prod_1', productName: 'Premium Laptop', price: 1299.99, quantity: 1 },
          { productId: 'prod_2', productName: 'Wireless Mouse', price: 39.99, quantity: 1 }
        ],
        totalValue: 1339.98
      },
      {
        orderId: 'ord_2',
        customerId: 'cust_1',
        date: '2024-08-20',
        items: [
          { productId: 'prod_1', productName: 'Premium Laptop', price: 1299.99, quantity: 1 },
          { productId: 'prod_4', productName: 'Monitor Stand', price: 79.99, quantity: 1 },
          { productId: 'prod_5', productName: 'Gaming Keyboard', price: 149.99, quantity: 1 }
        ],
        totalValue: 1529.97
      },
      {
        orderId: 'ord_3',
        customerId: 'cust_2',
        date: '2024-08-25',
        items: [
          { productId: 'prod_2', productName: 'Wireless Mouse', price: 39.99, quantity: 2 },
          { productId: 'prod_5', productName: 'Gaming Keyboard', price: 149.99, quantity: 1 }
        ],
        totalValue: 229.97
      },
      {
        orderId: 'ord_4',
        customerId: 'cust_3',
        date: '2024-09-01',
        items: [
          { productId: 'prod_3', productName: 'Office Chair', price: 349.99, quantity: 1 },
          { productId: 'prod_4', productName: 'Monitor Stand', price: 79.99, quantity: 1 }
        ],
        totalValue: 429.98
      }
    ];

    return customerId 
      ? mockOrders.filter(order => order.customerId === customerId)
      : mockOrders;
  }

  /**
   * Get product data
   */
  private static async getProductData(productId?: string, category?: string) {
    const mockProducts = [
      {
        id: 'prod_1',
        name: 'Premium Laptop',
        category: 'Electronics',
        price: 1299.99,
        cost: 899.99,
        description: 'High-performance laptop for professionals',
        popularity: 85,
        margin: 30.8
      },
      {
        id: 'prod_2',
        name: 'Wireless Mouse',
        category: 'Accessories',
        price: 39.99,
        cost: 25.99,
        description: 'Ergonomic wireless mouse',
        popularity: 92,
        margin: 35.0
      },
      {
        id: 'prod_3',
        name: 'Office Chair',
        category: 'Furniture',
        price: 349.99,
        cost: 199.99,
        description: 'Comfortable ergonomic office chair',
        popularity: 78,
        margin: 42.9
      },
      {
        id: 'prod_4',
        name: 'Monitor Stand',
        category: 'Accessories',
        price: 79.99,
        cost: 49.99,
        description: 'Adjustable monitor stand',
        popularity: 65,
        margin: 37.5
      },
      {
        id: 'prod_5',
        name: 'Gaming Keyboard',
        category: 'Electronics',
        price: 149.99,
        cost: 89.99,
        description: 'Mechanical gaming keyboard with RGB lighting',
        popularity: 73,
        margin: 40.0
      },
      {
        id: 'prod_6',
        name: 'Laptop Stand',
        category: 'Accessories',
        price: 59.99,
        cost: 35.99,
        description: 'Portable laptop stand',
        popularity: 68,
        margin: 40.0
      }
    ];

    let filtered = mockProducts;

    if (productId) {
      filtered = filtered.filter(product => product.id === productId);
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    return filtered;
  }

  /**
   * Get customer data
   */
  private static async getCustomerData(customerId?: string) {
    if (!customerId) return null;

    // Mock customer data
    const mockCustomers = {
      'cust_1': {
        id: 'cust_1',
        segments: ['tech_enthusiast', 'premium_buyer'],
        averageOrderValue: 1400,
        orderFrequency: 'monthly',
        preferredCategories: ['Electronics', 'Accessories']
      },
      'cust_2': {
        id: 'cust_2',
        segments: ['budget_conscious', 'gamer'],
        averageOrderValue: 200,
        orderFrequency: 'quarterly',
        preferredCategories: ['Electronics', 'Accessories']
      },
      'cust_3': {
        id: 'cust_3',
        segments: ['office_professional'],
        averageOrderValue: 400,
        orderFrequency: 'yearly',
        preferredCategories: ['Furniture', 'Accessories']
      }
    };

    return mockCustomers[customerId] || null;
  }

  /**
   * Generate cross-sell recommendations
   */
  private static async generateCrossSellRecommendations(
    orders: any[], 
    products: any[], 
    baseProductId?: string
  ): Promise<CrossSellRecommendation[]> {
    const recommendations: CrossSellRecommendation[] = [];

    // Analyze frequently bought together patterns
    const productPairs = new Map<string, { count: number; totalValue: number }>();

    orders.forEach(order => {
      const items = order.items;
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const pair = `${items[i].productId}-${items[j].productId}`;
          const reversePair = `${items[j].productId}-${items[i].productId}`;
          const key = pair < reversePair ? pair : reversePair;
          
          if (!productPairs.has(key)) {
            productPairs.set(key, { count: 0, totalValue: 0 });
          }
          const pairData = productPairs.get(key)!;
          pairData.count++;
          pairData.totalValue += order.totalValue;
        }
      }
    });

    // Generate recommendations based on pairs
    productPairs.forEach((data, pairKey) => {
      const [productId1, productId2] = pairKey.split('-');
      const targetProductId = baseProductId === productId1 ? productId2 : productId1;
      
      if (!baseProductId || baseProductId === productId1 || baseProductId === productId2) {
        const product = products.find(p => p.id === targetProductId);
        if (product && data.count >= 2) { // Minimum frequency threshold
          recommendations.push({
            productId: product.id,
            productName: product.name,
            category: product.category,
            confidence: Math.min(90, (data.count / orders.length) * 100 + 40),
            frequency: data.count,
            averageOrderValue: data.totalValue / data.count,
            reason: `Frequently bought together (${data.count} times)`
          });
        }
      }
    });

    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
  }

  /**
   * Generate upsell recommendations
   */
  private static async generateUpsellRecommendations(
    products: any[], 
    orders: any[], 
    baseProductId?: string
  ): Promise<UpsellRecommendation[]> {
    const recommendations: UpsellRecommendation[] = [];

    products.forEach(currentProduct => {
      if (baseProductId && baseProductId !== currentProduct.id) return;

      // Find higher-priced products in the same category
      const upgrades = products.filter(p => 
        p.category === currentProduct.category && 
        p.price > currentProduct.price &&
        p.id !== currentProduct.id
      );

      upgrades.forEach(upgrade => {
        const priceDifference = upgrade.price - currentProduct.price;
        const confidence = Math.max(60, 90 - (priceDifference / currentProduct.price) * 50);

        recommendations.push({
          currentProductId: currentProduct.id,
          recommendedProductId: upgrade.id,
          currentProductName: currentProduct.name,
          recommendedProductName: upgrade.name,
          priceDifference,
          valueProposition: `Upgrade for enhanced features and performance`,
          confidence,
          potentialRevenue: priceDifference
        });
      });
    });

    return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
  }

  /**
   * Generate bundle recommendations
   */
  private static async generateBundleRecommendations(
    orders: any[], 
    products: any[]
  ): Promise<BundleRecommendation[]> {
    const recommendations: BundleRecommendation[] = [];

    // Create bundles based on popular combinations
    const bundles = [
      {
        id: 'bundle_1',
        name: 'Productivity Essentials',
        productIds: ['prod_1', 'prod_2', 'prod_4'],
        discount: 0.15
      },
      {
        id: 'bundle_2',
        name: 'Gaming Setup',
        productIds: ['prod_1', 'prod_5', 'prod_6'],
        discount: 0.12
      },
      {
        id: 'bundle_3',
        name: 'Office Comfort',
        productIds: ['prod_3', 'prod_4', 'prod_6'],
        discount: 0.18
      }
    ];

    bundles.forEach(bundle => {
      const bundleProducts = products.filter(p => bundle.productIds.includes(p.id));
      if (bundleProducts.length === bundle.productIds.length) {
        const originalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
        const bundlePrice = originalPrice * (1 - bundle.discount);
        const savings = originalPrice - bundlePrice;

        // Calculate popularity based on order data
        let popularity = 0;
        orders.forEach(order => {
          const orderProductIds = order.items.map(item => item.productId);
          const matches = bundle.productIds.filter(id => orderProductIds.includes(id));
          popularity += (matches.length / bundle.productIds.length) * 10;
        });

        recommendations.push({
          bundleId: bundle.id,
          bundleName: bundle.name,
          products: bundleProducts.map(p => ({
            productId: p.id,
            productName: p.name,
            price: p.price
          })),
          originalPrice,
          bundlePrice: Math.round(bundlePrice * 100) / 100,
          savings: Math.round(savings * 100) / 100,
          popularity: Math.round(popularity),
          confidence: Math.min(85, 60 + popularity)
        });
      }
    });

    return recommendations.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Generate new product recommendations
   */
  private static async generateNewProductRecommendations(
    products: any[], 
    orders: any[], 
    category?: string
  ): Promise<NewProductRecommendation[]> {
    const recommendations: NewProductRecommendation[] = [];

    // Mock new/trending products
    const newProducts = [
      {
        id: 'prod_new_1',
        name: 'Wireless Charging Pad',
        category: 'Electronics',
        description: 'Fast wireless charging for all devices',
        price: 49.99,
        trendScore: 92,
        marketDemand: 'high' as 'high',
        confidence: 88
      },
      {
        id: 'prod_new_2',
        name: 'Ergonomic Desk Pad',
        category: 'Accessories',
        description: 'Large desk pad for enhanced workspace comfort',
        price: 29.99,
        trendScore: 78,
        marketDemand: 'medium' as 'medium',
        confidence: 75
      },
      {
        id: 'prod_new_3',
        name: 'Smart Standing Desk',
        category: 'Furniture',
        description: 'Height-adjustable smart desk with memory settings',
        price: 599.99,
        trendScore: 85,
        marketDemand: 'high' as 'high',
        confidence: 82
      }
    ];

    newProducts.forEach(product => {
      if (!category || product.category === category) {
        const reasonMap = {
          'high': 'High market demand and trending in your purchase categories',
          'medium': 'Growing popularity among similar customers',
          'low': 'Emerging product with potential interest'
        };

        recommendations.push({
          productId: product.id,
          productName: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          trendScore: product.trendScore,
          marketDemand: product.marketDemand,
          recommendationReason: reasonMap[product.marketDemand],
          confidence: product.confidence
        });
      }
    });

    return recommendations.sort((a, b) => b.trendScore - a.trendScore);
  }

  /**
   * Calculate summary statistics
   */
  private static calculateSummary(result: RecommendationResult) {
    let totalRecommendations = 0;
    let totalConfidence = 0;
    let estimatedRevenue = 0;
    const categories = new Set<string>();

    // Count cross-sell recommendations
    if (result.crossSell) {
      totalRecommendations += result.crossSell.length;
      totalConfidence += result.crossSell.reduce((sum, r) => sum + r.confidence, 0);
      estimatedRevenue += result.crossSell.reduce((sum, r) => sum + r.averageOrderValue, 0);
      result.crossSell.forEach(r => categories.add(r.category));
    }

    // Count upsell recommendations  
    if (result.upsell) {
      totalRecommendations += result.upsell.length;
      totalConfidence += result.upsell.reduce((sum, r) => sum + r.confidence, 0);
      estimatedRevenue += result.upsell.reduce((sum, r) => sum + r.potentialRevenue, 0);
    }

    // Count bundle recommendations
    if (result.bundles) {
      totalRecommendations += result.bundles.length;
      totalConfidence += result.bundles.reduce((sum, r) => sum + r.confidence, 0);
      estimatedRevenue += result.bundles.reduce((sum, r) => sum + r.savings, 0);
    }

    // Count new product recommendations
    if (result.newProducts) {
      totalRecommendations += result.newProducts.length;
      totalConfidence += result.newProducts.reduce((sum, r) => sum + r.confidence, 0);
      estimatedRevenue += result.newProducts.reduce((sum, r) => sum + r.price * 0.1, 0); // 10% conversion estimate
      result.newProducts.forEach(r => categories.add(r.category));
    }

    return {
      totalRecommendations,
      averageConfidence: totalRecommendations > 0 ? Math.round(totalConfidence / totalRecommendations) : 0,
      estimatedRevenueImpact: Math.round(estimatedRevenue * 100) / 100,
      categories: Array.from(categories)
    };
  }

  /**
   * Generate insights from data
   */
  private static generateInsights(orders: any[], result: RecommendationResult) {
    // Calculate top category
    const categoryCount = new Map<string, number>();
    orders.forEach(order => {
      order.items.forEach(item => {
        const category = this.getCategoryForProduct(item.productId);
        categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
      });
    });

    const topCategory = Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Electronics';

    // Calculate average basket size
    const averageBasketSize = orders.length > 0 
      ? Math.round(orders.reduce((sum, order) => sum + order.items.length, 0) / orders.length * 10) / 10 
      : 0;

    return {
      topCategory,
      mostFrequentPair: result.crossSell?.[0] ? 
        `${result.crossSell[0].productName} frequently bought together` : 
        'Premium Laptop + Wireless Mouse',
      averageBasketSize,
      seasonalTrends: ['Electronics peak in Q4', 'Office furniture rises in Q1', 'Accessories steady year-round']
    };
  }

  /**
   * Helper method to get category for product
   */
  private static getCategoryForProduct(productId: string): string {
    const categoryMap = {
      'prod_1': 'Electronics',
      'prod_2': 'Accessories', 
      'prod_3': 'Furniture',
      'prod_4': 'Accessories',
      'prod_5': 'Electronics',
      'prod_6': 'Accessories'
    };
    return categoryMap[productId] || 'Electronics';
  }
}

export default ProductRecommendationService;
