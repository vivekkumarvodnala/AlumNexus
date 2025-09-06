/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // React files
  ],
  darkMode: 'class', // enable dark mode toggle via class
  theme: {
    extend: {
      colors: {
        primary: '#0D9488',    // Teal 600 → calm, balanced
        secondary: '#8B5CF6',  // Violet 500 → creative, modern
        background: '#F9FAFB', // Gray 50
        accent: '#1F2937',     // Gray 800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
