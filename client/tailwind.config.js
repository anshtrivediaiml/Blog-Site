const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  darkMode: 'class', // Enable dark mode based on the 'class' attribute
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#E5E7EB', // Example dark mode background color
          200: '#374151', // Example dark mode text color
          // Add more dark mode color variants as needed
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
