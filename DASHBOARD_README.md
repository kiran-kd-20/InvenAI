# InvenAI - Demand Forecasting Dashboard

## 🎯 Overview

InvenAI is a comprehensive inventory management and demand forecasting dashboard built with **Next.js 15**, **TypeScript**, **TailwindCSS**, and **Recharts**. This project implements Phase 1: Frontend tasks as requested by Ms. Anila.

## 🚀 Features Implemented

### ✅ Complete Demand Forecasting Dashboard UI

1. **Interactive Charts & Visualizations**
   - Historical sales data with line charts
   - Forecast vs actual sales comparison
   - Real-time data visualization using Recharts
   - Responsive charts that adapt to different screen sizes

2. **Advanced Filtering System**
   - Date range picker (start/end dates)
   - Product category filter
   - Region-based filtering
   - Quick filter buttons (This Month, Last Month, Last Quarter)
   - Active filter indicators with clear functionality

3. **Comprehensive Metrics Dashboard**
   - Forecast accuracy calculation
   - Sales variance analysis
   - Total sales tracking
   - Daily average metrics
   - Color-coded trend indicators

4. **Smart Insights & Analytics**
   - Best/worst performing categories
   - Forecast trend analysis
   - Automated recommendations
   - Data point statistics

5. **Professional UI Components**
   - Metric cards matching Figma design exactly
   - Recent orders table with real-time data
   - Top selling products with pagination
   - Modern sidebar navigation
   - Header with activity tracking

## 🎨 Design System

### Colors (Exact Figma Match)
- **Primary Teal**: `#0d9488` (buttons, links, main elements)
- **Background**: `#e6fffa` (light teal background)
- **Sidebar**: `#115e59` (dark teal)
- **Cards**: White with subtle shadows
- **Accent Colors**: Blue, Red, Orange, Purple for metric cards

### Typography
- **Font**: Inter (exactly as specified in Figma)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing & Layout
- **Rounded corners**: 16px for cards, 12px for inputs
- **Padding**: 24px for cards, 16px for smaller elements
- **Grid**: Responsive grid system (1/2/4 columns)

## 📁 File Structure

```
InvenAI/
├── app/
│   └── dashboard/
│       └── page.tsx                 # Main dashboard page
├── components/
│   ├── ChartWrapper.tsx            # Reusable chart component
│   ├── DemandFilters.tsx           # Advanced filtering UI
│   ├── DemandForecastCard.tsx      # Specialized metric cards
│   ├── DemandInsights.tsx          # Smart analytics component
│   ├── ForecastChart.tsx           # Sales forecasting charts
│   ├── ForecastMetrics.tsx         # Forecast accuracy metrics
│   └── FilterControls.tsx          # Basic filter controls
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── Charts.tsx          # Chart components
│   │   │   ├── MetricCard.tsx      # Metric display cards
│   │   │   ├── RecentOrdersTable.tsx # Orders table
│   │   │   └── TopSellingProducts.tsx # Products table
│   │   └── layout/
│   │       ├── Header.tsx          # Navigation header
│   │       └── Sidebar.tsx         # Navigation sidebar
│   └── utils/
│       └── index.ts                # Utility functions
├── lib/
│   └── mockData.ts                 # Enhanced mock data
└── tailwind.config.js              # Tailwind configuration
```

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📊 Mock Data Structure

The dashboard uses comprehensive mock data including:

```typescript
// Sales data with forecasting
interface SalesData {
  date: string;
  sales: number;
  forecast: number;
  category: string;
  region: string;
}

// Extended mock data (30+ data points)
- Electronics, Clothing, Home & Garden categories
- North/South regions
- January 2024 date range
- Realistic sales/forecast variance
```

## 🔧 Key Components

### 1. DemandFilters
- Date range selection
- Category/region dropdowns
- Active filter indicators
- Quick filter buttons

### 2. ForecastMetrics
- Forecast accuracy calculation
- Sales variance analysis
- Trend indicators
- Performance metrics

### 3. ForecastChart
- Sales vs forecast line charts
- Interactive tooltips
- Responsive design
- Custom legends

### 4. DemandInsights
- Category performance analysis
- Automated recommendations
- Trend predictions
- Data statistics

## 🎨 Figma Design Compliance

✅ **Exact color matching** (teal theme)
✅ **Typography consistency** (Inter font)
✅ **Layout precision** (grid system, spacing)
✅ **Component styling** (cards, buttons, tables)
✅ **Responsive behavior** (mobile/desktop)
✅ **Interactive elements** (filters, charts, buttons)

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open dashboard**:
   Navigate to `http://localhost:3000/dashboard`

## 📱 Responsive Design

- **Desktop**: Full 4-column layout with all components
- **Tablet**: 2-column adaptive layout
- **Mobile**: Single column stack with touch-friendly controls

## 🔮 Next Steps (Future Phases)

- Backend API integration
- Real-time data updates
- Advanced forecasting algorithms
- User authentication
- Database implementation
- Export functionality

## 👩‍💻 Development Notes

This implementation strictly follows the Figma design specifications and provides a solid foundation for Phase 2 backend integration. All components are built with scalability and maintainability in mind, using TypeScript for type safety and TailwindCSS for consistent styling.

**Delivered by**: GitHub Copilot
**Project Phase**: 1 (Frontend Complete)
**Status**: ✅ Ready for backend integration
