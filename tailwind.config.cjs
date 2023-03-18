/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fc7884",
        secondary: "#6a67f3",
        tertiary: "#498cda",
        card: "#3b3464",
        base: "#332e59",
        "base-dark": "#2E2A51",
        "base-darker": "#262343",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
};

module.exports = config;
