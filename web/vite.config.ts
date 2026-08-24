import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // The Django API runs on 8000; the browser only ever talks to /api.
      // Use 127.0.0.1, not localhost: on machines where localhost resolves to
      // ::1 first, the proxy would dial [::1]:8000 and runserver only listens
      // on IPv4, so every /api call would come back as a proxy 500.
      '/api': 'http://127.0.0.1:8000',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: false,
  },
})
