/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "light-background": "#26323C",
        "dark-background": "#0A192F",
        "light-input": "#F8F8F8",
        "dark-input": "#536381",
        "dark-text": "#CDD7F7",
        "dark-panel": "#172A46",
        "dark-button-outline": "#60F3D2",
        "dark-button-text": "#60F3D2",
        "dark-button-bg": "#172A46",
      },
    },
  },
  plugins: [],
};
