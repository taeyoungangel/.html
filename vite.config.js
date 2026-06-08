import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'AboutUs.html'),
        history: resolve(__dirname, 'History.html'),
        facility: resolve(__dirname, 'Facility.html'),
        location: resolve(__dirname, 'Location.html'),
        contact: resolve(__dirname, 'Contact.html'),
        login: resolve(__dirname, 'Login.html'),
        employee: resolve(__dirname, 'Employee.html'),
      },
    },
  },
})
