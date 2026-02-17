import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom', // "Crea un navegador virtual"
    globals: true, // "Permite usar describe/it sin importarlos en cada     fichero"
    setupFiles: './src/test/setup.ts', // "Ejecuta esto antes de los tests"
  }
})
