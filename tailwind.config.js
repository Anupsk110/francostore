/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: '#08080c',
          canvas: '#0b0b12',
          card: '#0f0f18',
          cardHover: '#151524',
          border: '#1c1c2e',
          borderLight: '#2a2a42',
          violet: '#7c5cfc',
          violetHover: '#6a46fc',
          violetGlow: 'rgba(124, 92, 252, 0.35)',
          cyan: '#00f2fe',
          cyanDeep: '#06b6d4',
          cyanGlow: 'rgba(0, 242, 254, 0.3)',
        },
        haven: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c5cfc',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#08080c',
        },
        brand: {
          purple: '#7c5cfc',
          deep: '#5b21b6',
          dark: '#08080c',
          light: '#141424',
          accent: '#00f2fe',
          gold: '#f59e0b',
          amber: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.4)',
        'card': '0 8px 30px -4px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(28, 28, 46, 0.8)',
        'hover': '0 12px 35px -5px rgba(124, 92, 252, 0.22), 0 0 1px 1px rgba(124, 92, 252, 0.4)',
        'glow': '0 0 25px rgba(124, 92, 252, 0.45)',
        'glow-cyan': '0 0 25px rgba(0, 242, 254, 0.35)',
        'glow-violet': '0 0 30px rgba(124, 92, 252, 0.5)',
      }
    },
  },
  plugins: [],
}
