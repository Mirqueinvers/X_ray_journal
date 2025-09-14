import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // доступ извне контейнера
    port: 5173,        // внутри контейнера
    watch: {
      usePolling: true, // заставляем следить за volume
    },
  },
})
