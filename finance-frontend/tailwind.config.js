/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B0F14",
          900: "#0F151C",
          800: "#12181F",
          700: "#1A222B",
          600: "#232B35",
          500: "#3A4552",
        },
        paper: {
          50: "#F3F1EC",
          100: "#EDEEF0",
          400: "#8B93A1",
          500: "#6B7280",
        },
        gilt: {
          300: "#E6C57A",
          400: "#D4A24C",
          500: "#B8863A",
          600: "#8F6A2E",
        },
        gain: "#4ADE80",
        loss: "#F1707A",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
