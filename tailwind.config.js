export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        MyGreen1: "#1c4d4b",
        MyGreen2: "#58FF8E",
        MyGreen3: "#D5FFE3",
        MyOrange1: "#FF8058",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        "shoebox-left": ['"Shoebox-ToTheLeft"', "sans-serif"],
        "shoebox-right": ['"Shoebox-ToTheRight"', "sans-serif"],
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};
