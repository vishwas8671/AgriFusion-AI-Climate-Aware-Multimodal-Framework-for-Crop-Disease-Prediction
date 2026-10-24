/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173F35',
          dark: '#0f2923',
          light: '#23594b'
        },
        agri: {
          DEFAULT: '#287D5A',
          hover: '#21684b',
          light: '#359f73',
          subtle: '#E8F5EF'
        },
        sage: {
          DEFAULT: '#E8F0EB',
          light: '#f2f7f4',
          dark: '#d1e0d6'
        },
        offwhite: '#F7F8F5',
        charcoal: {
          DEFAULT: '#202B27',
          light: '#34453f',
          muted: '#4a5e56'
        },
        neutralgrey: {
          DEFAULT: '#66736D',
          light: '#9ba7a1',
          border: '#D8DFDC'
        },
        agriamber: {
          DEFAULT: '#D99A27',
          subtle: '#FDF7EB',
          dark: '#B07817'
        },
        agrired: {
          DEFAULT: '#C74747',
          subtle: '#FDF1F1',
          dark: '#9E3232'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(23, 63, 53, 0.05), 0 1px 2px -1px rgba(23, 63, 53, 0.05)',
        'card': '0 4px 6px -1px rgba(23, 63, 53, 0.04), 0 2px 4px -2px rgba(23, 63, 53, 0.03)',
        'elevated': '0 10px 15px -3px rgba(23, 63, 53, 0.08), 0 4px 6px -4px rgba(23, 63, 53, 0.04)',
      }
    },
  },
  plugins: [],
}
