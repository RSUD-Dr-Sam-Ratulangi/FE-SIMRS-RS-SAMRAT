/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        soft: '0px 3.5px 5.5px 0px rgba(0, 0, 0, 0.02)',
      },
      colors: {
        primary: {
          DEFAULT: '#55A46B',
          50: '#F5FDF7',
          100: '#F2F8F2',
          200: '#F2F8F2',
          300: '#E6F4E6',
          400: '#A3E3B1',
          500: '#55A46B',
          600: '#4D8B5F',
          700: '#3F6C4F',
          800: '#2F4D3E',
          900: '#24352F',
        },
        disabled: '#A0AEC0',
        lightgray: '#F8F9FA',
        dark: '#2D3748',

        success: {
          DEFAULT: '#48BB78',
          50: '#F0FFF4',
          100: '#F0FFF4',
          200: '#E6FFED',
          300: '#9AE6B4',
          400: '#68D391',
          500: '#48BB78',
          600: '#38A169',
          700: '#2F855A',
          800: '#276749',
          900: '#22543D',
        },
        danger: {
          DEFAULT: '#F56565',
          50: '#FFF5F5',
          100: '#FFF5F5',
          200: '#FED7D7',
          300: '#FEB2B2',
          400: '#FC8181',
          500: '#F56565',
          600: '#E53E3E',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742A2A',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['acid'],
  },
}
