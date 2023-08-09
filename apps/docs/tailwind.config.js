/** @type {import('tailwindcss').Config} */

const { nextui } = require("@unique-ui/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@unique-ui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@unique-ui/button/dist/button.js", // <- single component styles
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
