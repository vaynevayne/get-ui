/** @type {import('tailwindcss').Config} */

const { getui } = require("@get-ui/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@get-ui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@get-ui/button/dist/button.js", // <- single component styles
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [getui()],
};
