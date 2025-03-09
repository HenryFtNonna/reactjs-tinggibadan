/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'marquee-paused': 'marquee-paused 20s linear infinite',
      },
      keyframes: {
        'marquee-paused': {
          '0%': { transform: 'translateX(100%)' },
          '90%': { transform: 'translateX(-100%)' }, // 20% pertama untuk animasi scroll
          '100%': { transform: 'translateX(-100%)' }, // 80% sisanya untuk jeda
        },
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px rgba(0,0,0,1)",
        "brutal-lg": "8px 8px 0px 0px rgba(0,0,0,1)"
      }
    },
  },
  plugins: [],
}

