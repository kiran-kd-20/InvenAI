'use client';

import { ForecastChart } from './ForecastChart';
import { SalesData } from '../lib/mockData';

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  data: SalesData[];
  type: 'sales' | 'forecast' | 'bar';
}

export function ChartWrapper({ title, subtitle, data, type }: ChartWrapperProps) {
  return (
    <ForecastChart 
      data={data}
      title={title}
      height={320}
    />
  );
}
