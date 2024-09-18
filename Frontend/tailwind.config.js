/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {

        primary: {
          DEFAULT: "#F41E1E",
          light: "#f64f4f",
          dark: "#d50a0a",
        },
        themeColor2: "#3843C1",
        titleColor: "#1D2229",
        bodyColor: "#6A6A6A",
        smokeColor: "#F8F8F8",
        smokeColor2: "#F6F6F6",
        smokeColor3: "#F2F2F2",
        blackColor: "#000000",
        blackColor2: "#141414",
        blackColor3: "#171717",
        blackColor4: "#2F394A",
        blackColor5: "#22272E",
        blackColor6: "#2D333D",
        blackColor7: "#0E0E13",
        grayColor: "#bdbdbd",
        whiteColor: "#ffffff",
        lightColor: "#AFB1C3",
        yellowColor: "#FFB539",
        successColor: "#28a745",
        errorColor: "#dc3545",
        thBorderColor: "#D8DDE1",
        thBorderColor2: "#2F343B",
        thBorderColor3: "#252A31",
        thBorderColor4: "#353B45",
        thBorderColor5: "#49515C",
        thBorderColor6: "#383D46",
        thBodyBackground: "#ffffff",
        blight: '#F2F2F2', //light background for cards etc.
        bdark: '#1D2228' //dark background for cards etc.
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
      },

    },
  },
  plugins: [],
};
