/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo
        secondary: "#ec4899", // Pink
        dark: "#0f172a", // Slate 900
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // تأكد إنك ضفت الخط في index.html لو حابب
      }
    },
  },
  plugins: [],
}
