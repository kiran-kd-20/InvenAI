/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Primary Teal Colors (exact from Figma)
        primary: {
          50: '#f0fdfa',   // Light teal background
          100: '#ccfbf1',  // Very light teal
          200: '#99f6e4',  // Light teal
          300: '#5eead4',  // Medium light teal
          400: '#2dd4bf',  // Medium teal
          500: '#14b8a6',  // Main teal
          600: '#0d9488',  // Primary teal (buttons, links)
          700: '#0f766e',  // Dark teal (hover states)
          800: '#115e59',  // Sidebar background (exact match)
          900: '#134e4a',  // Very dark teal
        },
        // Secondary Colors (exact from Figma cards)
        secondary: {
          blue: '#3B82F6',     // Blue metric card icon
          pink: '#EC4899',     // Pink metric card icon  
          orange: '#F97316',   // Orange metric card icon
          purple: '#8B5CF6',   // Purple metric card icon
          green: '#10B981',    // Success/positive color
          red: '#EF4444',      // Error/negative color
          yellow: '#F59E0B',   // Warning color
        },
      },
      backgroundColor: {
        'teal-light': '#f0fdfa',  // Main background
        'teal-dark': '#115e59',   // Sidebar background
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
