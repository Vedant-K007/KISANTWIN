/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#12372A',
          dark: '#0C261D',
          light: '#1A4A39',
          border: '#1E523F'
        },
        emerald: {
          DEFAULT: '#16A878',
          hover: '#128F66',
          light: '#EAF8F1',
          soft: '#65C18C'
        },
        water: {
          DEFAULT: '#2F80ED',
          hover: '#1E6AD2',
          light: '#E8F3FF',
          border: '#BBE0FF'
        },
        kisan: {
          bg: '#F5F7F3',
          card: '#FFFFFF',
          text: '#17231D',
          muted: '#66756D',
          border: '#DCE5DF',
          warning: '#F2B84B',
          'warning-light': '#FFF7E6',
          critical: '#E45756',
          'critical-light': '#FDE8E8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
