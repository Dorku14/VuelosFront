/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configura las rutas de los archivos donde Tailwind debe buscar clases
  content: [
    './src/**/*.{vue,js,jsx,ts,tsx}', // Cambia esto según tu estructura de directorios
    './index.html', // Incluye el archivo HTML si lo tienes en esta ubicación
  ],
  theme: {
    extend: {
      // Extiende la configuración de Tailwind CSS según tus necesidades
    },
  },
  plugins: [
    // Puedes agregar plugins de Tailwind CSS aquí
  ],
};

