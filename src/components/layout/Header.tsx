'use client';

import { Search, Bell, Calendar } from 'lucide-react';
import { cn } from '../../utils';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-80 focus:ring-2 focus:border-transparent placeholder:text-gray-400 text-sm font-inter transition-all duration-200"
              style={{ '--tw-ring-color': '#0d9488' } as React.CSSProperties}
            />
          </div>
          
          {/* Date Range Selector */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-2.5 border font-inter">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">20 May 21 May</span>
            <span className="text-gray-500">Week</span>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Bell className="h-5 w-5" />
            <span 
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#0d9488' }}
            >
              <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
