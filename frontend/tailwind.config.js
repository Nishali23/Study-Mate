/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#805AD1",
        secondry: "white",
        third: "#f5f5f5",
        fourth: "gray",
        fifth: "#F58A07",
        sixth: "black",
      },
      spacing: {
        80: "20rem", // 320px
        96: "24rem", // 384px
        100: "28rem", // 448px
        120: "32rem", // 512px
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};
