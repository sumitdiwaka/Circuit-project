/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#0f172a', // slate-900
        'secondary-dark': '#1e293b', // slate-800
        'accent-pink': '#ec4899',
        'accent-purple': '#a855f7',
      }
    },
  },
  plugins: [],
}