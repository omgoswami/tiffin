/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html", // For Flask templates
    "./app/static/js/**/*.{js,jsx,ts,tsx}", // React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}