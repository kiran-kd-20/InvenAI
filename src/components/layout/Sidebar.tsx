'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Package, 
  BarChart3, 
  Bell, 
  Users, 
  Target, 
  ShoppingCart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '../../utils';
import { currentUser, navigationItems } from '../../data/dashboard';

const iconMap = {
  LayoutDashboard,
  TrendingUp,
  Package,
  BarChart3,
  Bell,
  Users,
  Target,
  ShoppingCart,
  Settings,
};

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="w-64 bg-primary-800 min-h-screen flex flex-col" style={{ backgroundColor: '#115e59' }}>
      {/* User Profile Section */}
      <div className="p-6 border-b border-primary-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F97316' }}>
            <span className="text-white font-semibold text-lg font-inter">
              {currentUser.avatar}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm font-inter">{currentUser.name}</h3>
            <p className="text-primary-300 text-xs font-inter">{currentUser.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            const isActive = item.name === activeItem;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => setActiveItem(item.name)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-sm font-medium font-inter",
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-primary-200 hover:text-white'
                  )}
                  style={isActive ? { backgroundColor: '#0f766e' } : {}}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-primary-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-primary-200 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium font-inter hover:bg-primary-700">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
