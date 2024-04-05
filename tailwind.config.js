/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    colors: {
      MyGreen1: "#1c4d4b",
      MyGreen2: "#58FF8E",
      MyGreen3: "#D5FFE3",
      MyOrange1: "#FF8058",
    },
    keyframes: {
      slideIn: {
        "0%": { transform: "translateY(-100%)" },
        "100%": { transform: "translateY(0)" },
      },
      slideOut: {
        from: { transform: "translateY(0)" },
        to: { transform: "translateY(-100%)" },
      },
    },
    animation: {
      "slide-in": "slideIn 0.5s ease-in-out forwards",
      "slide-out": "slideOut 0.5s ease-in-out forwards",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
