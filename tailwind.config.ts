import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom colors from your original theme
      colors: {
        'classic-green': '#173F25',
        'classic-cream': '#FDF9F6',
      },
      // Custom font families to match your design
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair-display)', 'serif'],
      },
      // Custom animations
      animation: {
        'open-book': 'open-book 3s ease-in-out infinite',
        'flip-1': 'flip-1 3s ease-in-out infinite',
        'flip-2': 'flip-2 3s ease-in-out infinite',
        'flip-3': 'flip-3 3s ease-in-out infinite',
      },
      // Keyframes for the custom animations
      keyframes: {
        'open-book': {
          '0%, 100%': { transform: 'rotateY(0deg) rotateX(10deg)' },
          '20%, 80%': { transform: 'rotateY(20deg) rotateX(10deg)' },
        },
        'flip-1': {
          '0%, 15%': { transform: 'rotateY(0deg)' },
          '40%, 100%': { transform: 'rotateY(-180deg)' },
        },
        'flip-2': {
          '0%, 20%': { transform: 'rotateY(0deg)' },
          '45%, 100%': { transform: 'rotateY(-180deg)' },
        },
        'flip-3': {
          '0%, 25%': { transform: 'rotateY(0deg)' },
          '50%, 100%': { transform: 'rotateY(-180deg)' },
        },
      },
      // Added for 3D transformations in bookshelf
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        '1200': '1200px',
        '1500': '1500px',
      },
      rotate: {
        'y-n90': 'rotateY(-90deg)',
        'y-25': 'rotateY(-25deg)',
      },
      translate: {
        'z-5': 'translateZ(1.25rem)',
      },
      writingMode: {
        'vertical-rl': 'vertical-rl',
      },
      textOrientation: {
        'mixed': 'mixed',
      },
    },
  },
  plugins: [],
};

export default config;