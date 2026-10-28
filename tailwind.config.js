/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Highlander Storefront Identity Palette
        highlander: {
          navy: '#0B2348',       // Primary Navy Blue
          deep: '#071A35',       // Deep Navy Background
          gold: '#C9A23A',       // Luxury Gold
          'gold-hover': '#B58D27',// Gold Hover State
          ivory: '#F8F6F1',      // Warm Ivory Page Background
          white: '#FFFFFF',      // Pure White
          powder: '#E8F0F8',     // Powder Blue Subtle Accent
          border: '#E4E0D8',     // Warm Border Tone
          text: '#0B2348',       // Primary Text
          muted: '#6F6C67',      // Secondary / Muted Text
        },
        aubergine: {
          DEFAULT: '#0B2348',
          dark: '#071A35',
          deep: '#040F20',
          light: '#133568',
          muted: '#1E4B8C',
          surface: 'rgba(11, 35, 72, 0.04)',
          border: 'rgba(11, 35, 72, 0.14)',
        },
        gold: {
          DEFAULT: '#C9A23A',
          light: '#DEBC5E',
          bright: '#F3D685',
          dark: '#B58D27',
          deep: '#8A6815',
          surface: 'rgba(201, 162, 58, 0.08)',
          border: 'rgba(201, 162, 58, 0.28)',
        },
        silver: {
          DEFAULT: '#E4E0D8',
          light: '#F8F6F1',
          surface: '#E8F0F8',
          dark: '#B8B4AC',
        },
        warm: {
          body: '#F8F6F1',
          cream: '#FDFCF9',
          surface: '#F3EFE7',
          muted: '#EAE5DB',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(11, 35, 72, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'elevated': '0 10px 25px -5px rgba(11, 35, 72, 0.08), 0 8px 10px -6px rgba(11, 35, 72, 0.04)',
        'gold-glow': '0 0 16px rgba(201, 162, 58, 0.35)',
        'glass': '0 4px 18px rgba(11, 35, 72, 0.05)',
      }
    },
  },
  plugins: [],
}
