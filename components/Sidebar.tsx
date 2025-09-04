'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  BarChart3, 
  Settings, 
  ShoppingCart,
  TrendingUp,
  Users,
  LogOut
} from 'lucide-react';

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Inventory Forecast', icon: Package },
    { name: 'Inventory', icon: Package },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Notifications', icon: FileText },
    { name: 'Supplier Management', icon: Users },
    { name: 'Stock Optimization', icon: TrendingUp },
    { name: 'Replenishment and Orders', icon: ShoppingCart },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-teal-800 min-h-screen flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-teal-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">👤</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Ahmed</h3>
            <p className="text-teal-300 text-sm">ahmed123@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === activeItem;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'bg-teal-700 text-white' 
                      : 'text-teal-200 hover:bg-teal-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-teal-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-teal-200 hover:bg-teal-700 hover:text-white rounded-lg transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
