/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      ciclismo: {
        rojo: "#E52329",
        verde: "#009F85",
        verdel: "#84D3C9",
        negro: "#2A2A2A"
      }
    }
  }
},
  plugins: [],
};
