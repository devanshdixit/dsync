/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        smallMobile: "350px",
        mobile: "420px",
        tablet: "768px",
        ipadPro: "1281px",
        laptop: "1500px",
        largeLaptop: "1700px",
        desktop: "1920px",
      },
    },
    fontFamily: {
      Inter: ["Inter", "sans-serif"],
      Balsamiq: ["Balsamiq Sans", "cursive"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
