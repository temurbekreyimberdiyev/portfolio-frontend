/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}", // Vue yoki React loyihangiz uchun
  ],
  theme: {
    extend: {
      fontFamily: {
        signature: ["Great Vibes", "cursive"],
         poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

