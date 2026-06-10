/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e8f0fe',
          100: '#d2e3fc',
          500: '#1a73e8',
          600: '#1557b0',
          700: '#174ea6',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8f9fa',
          canvas: '#f0f4f9',
        },
        ink: {
          DEFAULT: '#202124',
          muted: '#5f6368',
          faint: '#80868b',
        },
      },
      boxShadow: {
        paper: '0 1px 3px rgba(60, 64, 67, 0.15), 0 4px 8px rgba(60, 64, 67, 0.1)',
        card: '0 1px 2px rgba(60, 64, 67, 0.12), 0 1px 3px rgba(60, 64, 67, 0.08)',
        toolbar: '0 1px 2px rgba(60, 64, 67, 0.08)',
      },
      fontFamily: {
        sans: [
          'Google Sans',
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
