/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        yellowPrimary: "#FFC107",
        yellowBright: "#FFD700",
        yellowGlow: "#FFEB3B",

        black: "#000000",
        blackDark: "#0A0A0A",
        blackMedium: "#1A1A1A",
        blackLight: "#2A2A2A",

        textLight: "#E0E0E0",
        textGray: "#B0B0B0",
        grayBorder: "#333333",
      },
      fontFamily: {
        primary: ["Inter Tight", "sans-serif"],
      },
      boxShadow: {
        yellow: "0 0 20px rgba(255,193,7,0.3)",
        yellowGlow: "0 0 30px rgba(255,193,7,0.5)",
        dark: "0 4px 20px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
