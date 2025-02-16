/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",  // Escanea todos los archivos HTML y TypeScript
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      'mobile':'320px',
      'tablet':'768px',
      'desktop':'1023px',
    }
  },
  plugins: [],
};


