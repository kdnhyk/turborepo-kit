/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--inter)'],
        notoSans: ['var(--notoSans)'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        path: {
          '0%': {
            strokeDashoffset: '100',
          },
          '100%': {
            strokeDashoffset: '0',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        dash: 'path 1s linear infinite',
      },
    },
  },
  plugins: [],
}
