import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        miniver: ["Miniver", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#fef6e7",
          100: "#fde9c3",
          200: "#fbdb9c",
          300: "#f9cd74",
          400: "#f7c256",
          500: "#f5b739",
          600: "#f4b033",
          700: "#f2a72c",
          800: "#f09f24",
          900: "#ee9017",
        },
        secondary: {
          50: "#f3f4f6",
          100: "#e5e7eb",
          200: "#d1d5db",
          300: "#9ca3af",
          400: "#6b7280",
          500: "#4b5563",
          600: "#374151",
          700: "#1f2937",
          800: "#111827",
          900: "#030712",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
