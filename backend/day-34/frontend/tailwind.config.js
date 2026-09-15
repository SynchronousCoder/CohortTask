/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: "#f2f9f1",
          100: "#e2f3e0",
          200: "#c6e7c3",
          300: "#9ad596",
          400: "#69bc64",
          500: "#44a040",
          600: "#338230",
          700: "#2a6728",
          800: "#255224",
          900: "#204420",
          950: "#0c250c",
        },
      },
    },
  },
  plugins: [],
};
