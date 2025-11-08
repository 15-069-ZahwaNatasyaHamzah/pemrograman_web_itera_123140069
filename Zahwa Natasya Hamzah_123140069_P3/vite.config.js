import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Konfigurasi Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // File setup untuk testing
  },
})