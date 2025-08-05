/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      primary: "#004526",   // 60%
      secondary: "#F9F9F9", // 30%
      accent: "#FFD54F",    // 10% -
      textDark: "#1A1A1A",
      textLight: "#FFFFFF",
    }
    },
  },
  plugins: [],
};
