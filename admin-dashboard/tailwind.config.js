/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF8F5',
          100: '#F4ECE1',
          200: '#E8D9C5',
          300: '#D5BE9F',
          400: '#BE9E75',
          500: '#A48154',
          600: '#86643C',
          700: '#66492A',
          800: '#45301B',
          900: '#23180D',
        },
        dark: {
          DEFAULT: '#121212',
          surface: '#1A1A1A',
          muted: '#2A2A2A',
        },
        accent: {
          DEFAULT: '#C5A059',
          hover: '#B28C44',
          light: '#EADBB8',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'luxury': '0 20px 50px -10px rgba(0, 0, 0, 0.12)',
        'floating': '0 12px 40px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
