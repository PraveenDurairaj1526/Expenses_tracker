const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: "#8a6a00",
          dark: "#8a7808",
      },
        primary: "#0C1014",
        secondary: "#44474A",
        border_primary:'#c5c6ca61',
        background_light_100:'#F4F3F3',
        background_light_200:'#fdfcfb'
      },
    },
  },
  plugins: [],
});