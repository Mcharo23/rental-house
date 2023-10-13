/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner1:
          "url('https://www.eliteholidayhomes.com.au/wp-content/uploads/2023/07/banner3-1.jpg')",
      },
      colors: {
        "white-smoke": "#F5F5F5",
        "light-blue": "#3273F4",
      },
    },
  },
  plugins: [],
};
