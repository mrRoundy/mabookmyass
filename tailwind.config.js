const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair-display)', 'serif'],
      },
      colors: {
        'classic-green': '#173F25',
        'classic-cream': '#FDF9F6',
      },
      // Adding animations for the loading book on the prompt page
      animation: {
        'open-book': 'open-book 3s ease-in-out infinite',
        'flip-1': 'flip-1 3s ease-in-out infinite',
        'flip-2': 'flip-2 3s ease-in-out infinite',
        'flip-3': 'flip-3 3s ease-in-out infinite',
      },
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
        }
      }
    },
  },
  plugins: [],
}
export default config