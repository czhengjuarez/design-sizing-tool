/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cloudflare: {
          orange: '#F6821F',
          'orange-dark': '#E56F0F',
          blue: '#0051C3',
          'blue-dark': '#003D99',
          'blue-light': '#3B82F6',
          teal: '#06AED5',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          },
        },
      },
    },
  },
  plugins: [],
}

