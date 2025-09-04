'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after a short delay
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">InvenAI</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            AI-Powered Inventory Management System
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-sm text-gray-500">
              Loading your dashboard...
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
