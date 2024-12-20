/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line to scan your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#58606e",
        secondary: "#0043a8"
    },
  },
},
  plugins: [],
};
