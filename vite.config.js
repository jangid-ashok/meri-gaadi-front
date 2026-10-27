import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_PROXY_TARGET || 'http://localhost',
        changeOrigin: true,
      },
    },
  },
})
