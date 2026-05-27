import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Mar Caribe (turquesa/cyan del logo)
        mar: {
          50:  "#ecfbff",
          100: "#cef4ff",
          200: "#a3eaff",
          300: "#5edaff",
          400: "#1fc4e0",
          500: "#0aa3c2",
          600: "#0a83a0",
          700: "#106883",
          800: "#175770",
          900: "#1a485e",
          950: "#0b2d3d",
        },
        // Sol caribeño (amarillo cálido)
        sol: {
          50:  "#fffaeb",
          100: "#fff0c4",
          200: "#ffe085",
          300: "#ffc94a",
          400: "#fbb024",
          500: "#f5901a",
          600: "#d96b10",
          700: "#b34d13",
          800: "#923c17",
          900: "#783217",
        },
        // Coral (acento rojizo)
        coral: {
          100: "#ffe1d6",
          300: "#ffa583",
          400: "#ff7d52",
          500: "#ee5c2f",
          600: "#d34418",
        },
        // Arena cálida
        arena: {
          50:  "#fdfaf2",
          100: "#f9f0dd",
          200: "#f1dfba",
          300: "#e6c98a",
        },
      },
      fontFamily: {
        // Una display friendly, no súper formal
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body:    ["var(--font-nunito)", "system-ui", "sans-serif"],
        // Para acentos manuscritos / vibe casero
        hand:    ["var(--font-caveat)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
