// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
}

// Forecasting Types
export interface ForecastRequest {
  productId: string;
  forecastPeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  periodsAhead: number;
  includeExternalFactors?: boolean;
}

export interface ForecastResponse {
  productId: string;
  forecasts: Array<{
    date: Date;
    predictedDemand: number;
    confidence: number;
    period: string;
  }>;
  accuracy?: number;
  methodology: string;
}

// Replenishment Types
export interface ReplenishmentRequest {
  productId?: string;
  checkAllProducts?: boolean;
  urgencyThreshold?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface ReplenishmentSuggestion {
  productId: string;
  productName: string;
  currentStock: number;
  reorderPoint: number;
  recommendedQuantity: number;
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedLeadTime: number;
  costImpact: number;
  reason: string;
  daysUntilStockout?: number;
}

export interface ReplenishmentResponse {
  suggestions: ReplenishmentSuggestion[];
  summary: {
    totalProducts: number;
    criticalItems: number;
    totalCostImpact: number;
    averageLeadTime: number;
  };
}

// Stock Optimization Types
export interface OptimizationRequest {
  productId?: string;
  category?: string;
  analyzeAll?: boolean;
  timeframe?: number;
}

export interface StockOptimizationResult {
  productId: string;
  productName: string;
  category: string;
  currentStock: number;
  optimalStock: number;
  variance: number;
  variancePercentage: number;
  status: 'OPTIMAL' | 'UNDERSTOCK' | 'OVERSTOCK';
  costImpact: number;
  turnoverRate: number;
  daysOfInventory: number;
  recommendations: OptimizationRecommendation[];
}

export interface OptimizationRecommendation {
  type: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  actionRequired: string;
  potentialImpact: number;
  confidence: number;
}

export interface OptimizationResponse {
  results: StockOptimizationResult[];
  summary: {
    totalProducts: number;
    overstockedItems: number;
    understockedItems: number;
    optimalItems: number;
    totalCostImpact: number;
    averageTurnoverRate: number;
    slowMovingItems: number;
  };
}

// Product Recommendations Types
export interface RecommendationRequest {
  productId?: string;
  category?: string;
  analysisType?: 'cross_sell' | 'upsell' | 'bundling' | 'new_products' | 'all';
  timeframe?: number;
}

export interface ProductRecommendation {
  id: string;
  type: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  actionRequired: string;
  potentialImpact: number;
  confidence: number;
  validUntil?: Date;
  metadata?: {
    relatedProducts?: string[];
    suggestedPrice?: number;
    bundleComponents?: string[];
    targetCustomers?: string[];
  };
}

export interface CrossSellRecommendation {
  productId: string;
  productName: string;
  recommendedProducts: Array<{
    productId: string;
    productName: string;
    confidence: number;
    frequency: number;
    revenue_potential: number;
  }>;
}

export interface BundleRecommendation {
  bundleId: string;
  name: string;
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
  }>;
  bundlePrice: number;
  individualPrice: number;
  savings: number;
  confidence: number;
  expectedUplift: number;
}

export interface UpsellRecommendation {
  productId: string;
  productName: string;
  currentPrice: number;
  recommendedProducts: Array<{
    productId: string;
    productName: string;
    price: number;
    upliftPotential: number;
    confidence: number;
  }>;
}

export interface RecommendationResponse {
  general: ProductRecommendation[];
  crossSell: CrossSellRecommendation[];
  bundles: BundleRecommendation[];
  upsell: UpsellRecommendation[];
  summary: {
    totalRecommendations: number;
    highPriorityCount: number;
    totalPotentialImpact: number;
  };
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Common Query Parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}