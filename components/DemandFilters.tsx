'use client';

import { Calendar, Filter, X, ChevronDown } from 'lucide-react';
import { getCategories, getRegions } from '../lib/mockData';

interface DemandFiltersProps {
  filters: {
    category: string;
    region: string;
    startDate: string;
    endDate: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function DemandFilters({ filters, onFiltersChange }: DemandFiltersProps) {
  const categories = getCategories();
  const regions = getRegions();

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      region: '',
      startDate: '2024-01-01',
      endDate: '2024-01-30',
    });
  };

  const hasActiveFilters = filters.category || filters.region;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Filter className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-inter">Demand Filters</h3>
            <p className="text-sm text-gray-500 font-inter">Filter your forecasting data</p>
          </div>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 font-inter"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 font-inter">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => updateFilter('startDate', e.target.value)}
              className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-inter"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 font-inter">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => updateFilter('endDate', e.target.value)}
              className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-inter"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 font-inter">
            Product Category
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-inter appearance-none bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Region Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 font-inter">
            Region
          </label>
          <div className="relative">
            <select
              value={filters.region}
              onChange={(e) => updateFilter('region', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-inter appearance-none bg-white"
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-gray-600 font-inter">Active filters:</span>
            {filters.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 font-inter">
                Category: {filters.category}
                <button
                  onClick={() => updateFilter('category', '')}
                  className="ml-2 h-3 w-3 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.region && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 font-inter">
                Region: {filters.region}
                <button
                  onClick={() => updateFilter('region', '')}
                  className="ml-2 h-3 w-3 text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Quick Filter Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 font-inter">Quick filters:</span>
          <button
            onClick={() => updateFilter('startDate', '2024-01-01')}
            className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-inter"
          >
            This Month
          </button>
          <button
            onClick={() => updateFilter('startDate', '2023-12-01')}
            className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-inter"
          >
            Last Month
          </button>
          <button
            onClick={() => updateFilter('startDate', '2023-10-01')}
            className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-inter"
          >
            Last Quarter
          </button>
        </div>
      </div>
    </div>
  );
}
