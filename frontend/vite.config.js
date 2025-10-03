import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   theme: {
    extend: {
      fontFamily: {
        // Add 'Poppins' as the default sans-serif font
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Create a custom color palette
        'primary': '#1a237e', // A deep indigo
        'secondary': '#534bae',
        'accent': '#ffa726', // A vibrant orange
      }
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  },
})