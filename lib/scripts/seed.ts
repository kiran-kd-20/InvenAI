/**
 * Database Seed Script for InvenAI
 * 
 * This script populates the database with sample data for development and testing
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    id: 'prod_001',
    sku: 'WH-001',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    brand: 'TechBrand',
    unitPrice: 129.99,
    costPrice: 80.00,
    supplier: 'TechSupplier',
  },
  {
    id: 'prod_002',
    sku: 'CT-001',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    category: 'Clothing',
    brand: 'FashionBrand',
    unitPrice: 24.99,
    costPrice: 12.00,
    supplier: 'FashionSupplier',
  },
  {
    id: 'prod_003',
    sku: 'SN-001',
    name: 'Running Sneakers',
    description: 'Lightweight running shoes with cushioned sole',
    category: 'Footwear',
    brand: 'SportsBrand',
    unitPrice: 89.99,
    costPrice: 45.00,
    supplier: 'SportsSupplier',
  },
  {
    id: 'prod_004',
    sku: 'WB-001',
    name: 'Water Bottle',
    description: 'Stainless steel insulated water bottle',
    category: 'Accessories',
    brand: 'LifestyleBrand',
    unitPrice: 19.99,
    costPrice: 8.00,
    supplier: 'LifestyleSupplier',
  },
  {
    id: 'prod_005',
    sku: 'LT-001',
    name: 'Gaming Laptop',
    description: 'High-performance laptop for gaming',
    category: 'Electronics',
    brand: 'TechBrand',
    unitPrice: 1299.99,
    costPrice: 900.00,
    supplier: 'TechSupplier',
  },
];

const sampleInventory = [
  {
    productId: 'prod_001',
    currentStock: 75,
    reservedStock: 5,
    availableStock: 70,
    minimumStock: 20,
    maximumStock: 200,
    reorderPoint: 30,
    reorderQuantity: 50,
    warehouseLocation: 'A1-B2',
  },
  {
    productId: 'prod_002',
    currentStock: 150,
    reservedStock: 10,
    availableStock: 140,
    minimumStock: 50,
    maximumStock: 500,
    reorderPoint: 75,
    reorderQuantity: 100,
    warehouseLocation: 'B2-C3',
  },
  {
    productId: 'prod_003',
    currentStock: 45,
    reservedStock: 3,
    availableStock: 42,
    minimumStock: 15,
    maximumStock: 150,
    reorderPoint: 25,
    reorderQuantity: 40,
    warehouseLocation: 'C3-D4',
  },
  {
    productId: 'prod_004',
    currentStock: 200,
    reservedStock: 8,
    availableStock: 192,
    minimumStock: 30,
    maximumStock: 400,
    reorderPoint: 50,
    reorderQuantity: 80,
    warehouseLocation: 'D4-E5',
  },
  {
    productId: 'prod_005',
    currentStock: 12,
    reservedStock: 2,
    availableStock: 10,
    minimumStock: 5,
    maximumStock: 50,
    reorderPoint: 8,
    reorderQuantity: 15,
    warehouseLocation: 'E5-F6',
  },
];

const sampleSales = [
  // Product 1 sales (Headphones)
  { productId: 'prod_001', quantity: 5, unitPrice: 129.99, totalAmount: 649.95, saleDate: new Date('2025-07-15'), customerId: 'cust_001', salesChannel: 'online', region: 'North', seasonality: 'Q3' },
  { productId: 'prod_001', quantity: 3, unitPrice: 129.99, totalAmount: 389.97, saleDate: new Date('2025-07-20'), customerId: 'cust_002', salesChannel: 'store', region: 'South', seasonality: 'Q3' },
  { productId: 'prod_001', quantity: 8, unitPrice: 129.99, totalAmount: 1039.92, saleDate: new Date('2025-08-05'), customerId: 'cust_003', salesChannel: 'online', region: 'East', seasonality: 'Q3' },
  { productId: 'prod_001', quantity: 2, unitPrice: 129.99, totalAmount: 259.98, saleDate: new Date('2025-08-15'), customerId: 'cust_004', salesChannel: 'b2b', region: 'West', seasonality: 'Q3' },
  { productId: 'prod_001', quantity: 6, unitPrice: 129.99, totalAmount: 779.94, saleDate: new Date('2025-08-25'), customerId: 'cust_005', salesChannel: 'online', region: 'North', seasonality: 'Q3' },

  // Product 2 sales (T-Shirt)
  { productId: 'prod_002', quantity: 15, unitPrice: 24.99, totalAmount: 374.85, saleDate: new Date('2025-07-10'), customerId: 'cust_006', salesChannel: 'store', region: 'South', seasonality: 'Q3' },
  { productId: 'prod_002', quantity: 20, unitPrice: 24.99, totalAmount: 499.80, saleDate: new Date('2025-07-25'), customerId: 'cust_007', salesChannel: 'online', region: 'East', seasonality: 'Q3' },
  { productId: 'prod_002', quantity: 12, unitPrice: 24.99, totalAmount: 299.88, saleDate: new Date('2025-08-10'), customerId: 'cust_008', salesChannel: 'store', region: 'West', seasonality: 'Q3' },
  { productId: 'prod_002', quantity: 25, unitPrice: 24.99, totalAmount: 624.75, saleDate: new Date('2025-08-20'), customerId: 'cust_009', salesChannel: 'online', region: 'North', seasonality: 'Q3' },

  // Product 3 sales (Sneakers)
  { productId: 'prod_003', quantity: 4, unitPrice: 89.99, totalAmount: 359.96, saleDate: new Date('2025-07-12'), customerId: 'cust_010', salesChannel: 'store', region: 'East', seasonality: 'Q3' },
  { productId: 'prod_003', quantity: 7, unitPrice: 89.99, totalAmount: 629.93, saleDate: new Date('2025-08-02'), customerId: 'cust_011', salesChannel: 'online', region: 'West', seasonality: 'Q3' },
  { productId: 'prod_003', quantity: 3, unitPrice: 89.99, totalAmount: 269.97, saleDate: new Date('2025-08-18'), customerId: 'cust_012', salesChannel: 'store', region: 'South', seasonality: 'Q3' },

  // Product 4 sales (Water Bottle)
  { productId: 'prod_004', quantity: 30, unitPrice: 19.99, totalAmount: 599.70, saleDate: new Date('2025-07-08'), customerId: 'cust_013', salesChannel: 'b2b', region: 'North', seasonality: 'Q3' },
  { productId: 'prod_004', quantity: 18, unitPrice: 19.99, totalAmount: 359.82, saleDate: new Date('2025-07-22'), customerId: 'cust_014', salesChannel: 'online', region: 'South', seasonality: 'Q3' },
  { productId: 'prod_004', quantity: 22, unitPrice: 19.99, totalAmount: 439.78, saleDate: new Date('2025-08-12'), customerId: 'cust_015', salesChannel: 'store', region: 'East', seasonality: 'Q3' },

  // Product 5 sales (Laptop)
  { productId: 'prod_005', quantity: 1, unitPrice: 1299.99, totalAmount: 1299.99, saleDate: new Date('2025-07-18'), customerId: 'cust_016', salesChannel: 'store', region: 'West', seasonality: 'Q3' },
  { productId: 'prod_005', quantity: 2, unitPrice: 1299.99, totalAmount: 2599.98, saleDate: new Date('2025-08-08'), customerId: 'cust_017', salesChannel: 'b2b', region: 'North', seasonality: 'Q3' },
];

const sampleExternalFactors = [
  {
    factorType: 'weather',
    factorName: 'Summer Heat Wave',
    date: new Date('2025-08-15'),
    value: 35.5,
    category: 'temperature',
    impact: 'positive',
    description: 'High temperatures increase demand for cooling products',
  },
  {
    factorType: 'holiday',
    factorName: 'Back to School',
    date: new Date('2025-08-20'),
    value: 1.0,
    category: 'seasonal',
    impact: 'positive',
    description: 'Back to school season increases demand for electronics and clothing',
  },
  {
    factorType: 'economic',
    factorName: 'Consumer Confidence Index',
    date: new Date('2025-08-01'),
    value: 75.2,
    category: 'economic',
    impact: 'positive',
    description: 'High consumer confidence boosts discretionary spending',
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data (optional - remove in production)
    console.log('🧹 Cleaning existing data...');
    await prisma.externalFactor.deleteMany();
    await prisma.recommendation.deleteMany();
    await prisma.replenishment.deleteMany();
    await prisma.forecast.deleteMany();
    await prisma.sale.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.product.deleteMany();

    // Seed products
    console.log('📦 Seeding products...');
    for (const product of sampleProducts) {
      await prisma.product.create({
        data: product,
      });
    }

    // Seed inventory
    console.log('📊 Seeding inventory...');
    for (const inventory of sampleInventory) {
      await prisma.inventory.create({
        data: inventory,
      });
    }

    // Seed sales
    console.log('💰 Seeding sales data...');
    for (const sale of sampleSales) {
      await prisma.sale.create({
        data: sale,
      });
    }

    // Seed external factors
    console.log('🌍 Seeding external factors...');
    for (const factor of sampleExternalFactors) {
      await prisma.externalFactor.create({
        data: factor,
      });
    }

    // Generate some sample forecasts
    console.log('🔮 Generating sample forecasts...');
    const forecastsToCreate = [
      {
        productId: 'prod_001',
        forecastDate: new Date('2025-09-10'),
        forecastPeriod: 'weekly',
        predictedDemand: 25.0,
        confidence: 0.85,
        methodology: 'linear_regression',
      },
      {
        productId: 'prod_002',
        forecastDate: new Date('2025-09-10'),
        forecastPeriod: 'weekly',
        predictedDemand: 45.0,
        confidence: 0.78,
        methodology: 'linear_regression',
      },
      {
        productId: 'prod_003',
        forecastDate: new Date('2025-09-10'),
        forecastPeriod: 'weekly',
        predictedDemand: 12.0,
        confidence: 0.72,
        methodology: 'linear_regression',
      },
    ];

    for (const forecast of forecastsToCreate) {
      await prisma.forecast.create({
        data: forecast,
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log('\n📈 Sample data created:');
    console.log(`- ${sampleProducts.length} products`);
    console.log(`- ${sampleInventory.length} inventory records`);
    console.log(`- ${sampleSales.length} sales transactions`);
    console.log(`- ${sampleExternalFactors.length} external factors`);
    console.log(`- ${forecastsToCreate.length} sample forecasts`);
    console.log('\n🚀 Ready to test the APIs!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
