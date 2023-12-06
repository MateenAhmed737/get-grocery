/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        mont: "Montserrat",
        emoji: "Noto Color Emoji",
      },
      // colors: {
      //   primary: "#2563eb",
      //   "primary-tint": "#3b82f6",
      //   "primary-shade": "#1d4ed8",
      // },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
