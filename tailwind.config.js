/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        inputcolor: "#E7ECF3",
        primary: "#2EBAC1",
        secondary: "#A4D96C",
      },
      screens: {
        tablet: { max: "1023px" },
        mobile: { max: "767px" },
        "sm-mobile": { max: "374px" },
      },
    },
  },
  plugins: [],
};
