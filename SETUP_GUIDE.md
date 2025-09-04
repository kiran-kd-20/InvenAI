# 🚀 InvenAI Backend - Setup & Running Guide

## 📋 Prerequisites

Before running the backend, ensure you have:
- **Node.js 18+** installed
- **PostgreSQL database** running
- **npm** or **yarn** package manager

## 🔧 Setup Steps

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Environment Configuration**
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` with your database connection:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/invenai_db"
NODE_ENV="development"
```

### 3. **Database Setup**

#### Option A: Quick Setup (Recommended for Development)
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed with sample data
npm run db:seed
```

#### Option B: Migration-based Setup (Production)
```bash
# Generate Prisma client
npm run db:generate

# Create and run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 4. **Start the Backend**
```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

## 🌐 Access the Backend

Once running, the backend will be available at:
- **Development**: `http://localhost:3000`
- **API Endpoints**: `http://localhost:3000/api/*`

## 🧪 Test the APIs

### Quick API Test
```bash
# Test all APIs
npm run test:api

# Test specific functionality
npm run test:forecasting
```

### Manual API Testing

#### 1. Forecasting API
```bash
# POST - Generate forecast
curl -X POST http://localhost:3000/api/forecasting \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_001",
    "forecastPeriod": "weekly",
    "periodsAhead": 4
  }'

# GET - Check forecast accuracy
curl "http://localhost:3000/api/forecasting?productId=prod_001&accuracy=true&days=30"
```

#### 2. Replenishment API
```bash
# POST - Generate replenishment suggestions
curl -X POST http://localhost:3000/api/replenishment \
  -H "Content-Type: application/json" \
  -d '{
    "checkAllProducts": true,
    "urgencyThreshold": "MEDIUM"
  }'
```

#### 3. Stock Optimization API
```bash
# POST - Run optimization analysis
curl -X POST http://localhost:3000/api/optimization \
  -H "Content-Type: application/json" \
  -d '{
    "analyzeAll": true,
    "timeframe": 90
  }'

# GET - ABC Analysis
curl "http://localhost:3000/api/optimization?analysis=abc"
```

#### 4. Recommendations API
```bash
# POST - Generate recommendations
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "analysisType": "all",
    "timeframe": 90
  }'
```

## 🗄️ Database Management

### View Database (Prisma Studio)
```bash
npx prisma studio
```
Access at: `http://localhost:5555`

### Reset Database
```bash
npm run db:reset
```

### Re-seed Data
```bash
npm run db:seed
```

## 📊 Sample Data

After seeding, you'll have:
- **5 Products** across different categories
- **90 days** of sales history
- **Inventory records** with realistic stock levels
- **External factors** (weather, holidays, economic data)
- **Sample forecasts** for testing

### Sample Product IDs for Testing:
- `prod_001` - Wireless Bluetooth Headphones
- `prod_002` - Cotton T-Shirt
- `prod_003` - Running Sneakers
- `prod_004` - Water Bottle
- `prod_005` - Gaming Laptop

## 🔍 Troubleshooting

### Common Issues:

#### 1. **Database Connection Error**
```bash
Error: P1001: Can't reach database server
```
**Solution**: Ensure PostgreSQL is running and connection string is correct in `.env`

#### 2. **Missing Prisma Client**
```bash
Error: Cannot find module '@prisma/client'
```
**Solution**: Run `npm run db:generate`

#### 3. **Port Already in Use**
```bash
Error: Port 3000 is already in use
```
**Solution**: Kill the process or use a different port:
```bash
npm run dev -- -p 3001
```

#### 4. **TypeScript Errors**
```bash
# Check for type errors
npm run type-check

# Fix common issues
npm run db:generate  # Regenerate Prisma types
```

### Database Reset (if needed)
```bash
# Complete reset
npm run db:reset
npm run db:generate
npm run db:seed
```

## 📈 Production Deployment

### Build for Production
```bash
npm run build:production
```

### Environment Variables for Production
```env
DATABASE_URL="postgresql://user:pass@prod-host:5432/invenai_prod"
NODE_ENV="production"
NEXTAUTH_SECRET="your_production_secret"
```

## 🎯 Next Steps

1. **Start the backend**: `npm run dev`
2. **Test APIs**: Use the curl commands above
3. **View data**: Open Prisma Studio
4. **Integrate with frontend**: Use the API endpoints in your React components
5. **Add ML models**: Replace mock algorithms with real AI models

## 📝 API Documentation

All APIs return consistent responses:
```json
{
  "success": boolean,
  "data": object | null,
  "error": string | null
}
```

For detailed API documentation, see `BACKEND_README.md`.

---

**🎉 Your InvenAI backend is ready to go!**
