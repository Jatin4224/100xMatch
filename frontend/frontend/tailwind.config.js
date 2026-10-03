/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grape: { DEFAULT: "#8B4FD0", dark: "#5B2A91", light: "#C9A7F2" },
        sunny: { DEFAULT: "#FFD43B", dark: "#F2B705" },
        cream: { DEFAULT: "#F6EEDF", dark: "#EADFC8" },
        ink: "#16121D",
        blush: "#FF8FB1",
      },
      fontFamily: {
        bubble: ['"Bagel Fat One"', "system-ui", "sans-serif"],
        hand: ['"Caveat"', "cursive"],
        sans: ['"Fredoka"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        pop: "4px 4px 0 0 #16121D",
        "pop-lg": "8px 8px 0 0 #16121D",
        "pop-sm": "2px 2px 0 0 #16121D",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(8deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1.6s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        kodr: {
          primary: "#8B4FD0",
          "primary-content": "#FFFFFF",
          secondary: "#FFD43B",
          "secondary-content": "#16121D",
          accent: "#FF8FB1",
          "accent-content": "#16121D",
          neutral: "#16121D",
          "neutral-content": "#F6EEDF",
          "base-100": "#FFFDF8",
          "base-200": "#F6EEDF",
          "base-300": "#EADFC8",
          "base-content": "#16121D",
          info: "#7CC6FE",
          success: "#3BB273",
          warning: "#F2B705",
          error: "#E5484D",
          "--rounded-box": "1.5rem",
          "--rounded-btn": "9999px",
          "--border-btn": "2px",
        },
      },
    ],
  },
};
