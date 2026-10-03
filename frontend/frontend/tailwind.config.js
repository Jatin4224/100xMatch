/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hot: { DEFAULT: "#FF2E93", soft: "#FF8CC6", deep: "#3D0F28" },
        baby: { DEFAULT: "#FFC6E3", dark: "#FF8CC6" },
        rose: "#FF5FAE",
        night: { DEFAULT: "#0A0A0D", soft: "#1E1E26" },
        // text on light-pink surfaces
        ink: "#0A0A0D",
        // outlines and hard shadows
        line: "#FF2E93",
      },
      fontFamily: {
        bubble: ['"Bagel Fat One"', "system-ui", "sans-serif"],
        hand: ['"Caveat"', "cursive"],
        sans: ['"Fredoka"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        pop: "4px 4px 0 0 #FF2E93",
        "pop-lg": "8px 8px 0 0 #FF2E93",
        "pop-sm": "2px 2px 0 0 #FF2E93",
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
        blackpink: {
          primary: "#FF2E93",
          "primary-content": "#FFFFFF",
          secondary: "#FFC6E3",
          "secondary-content": "#0A0A0D",
          accent: "#FF5FAE",
          "accent-content": "#0A0A0D",
          neutral: "#1E1E26",
          "neutral-content": "#FFFFFF",
          "base-100": "#141419",
          "base-200": "#0A0A0D",
          "base-300": "#1E1E26",
          "base-content": "#F7F2F5",
          info: "#7CC6FE",
          success: "#3BB273",
          warning: "#FFC6E3",
          error: "#FF4D6D",
          "--rounded-box": "1.5rem",
          "--rounded-btn": "9999px",
          "--border-btn": "2px",
        },
      },
    ],
  },
};
