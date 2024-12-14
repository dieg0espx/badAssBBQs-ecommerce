// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red': '#980f0f', // Add custom color
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '50%': { 'border-color': 'transparent' },
          '100%': { 'border-color': 'black' },
        },
        spinning82341: {
          to: { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        slideUp: 'slideUp 0.7s',
        slideInFromRight: 'slideInFromRight 1.5s ease-out',
        typing: 'typing 2s steps(40, end) forwards',
        blink: 'blink 1s step-end infinite',
        spinning82341: 'spinning82341 1.7s linear infinite',
      },
    },
  },
  plugins: [
  ],
}
