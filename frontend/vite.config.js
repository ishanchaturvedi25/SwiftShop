import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { analyzer } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    analyzer(),
  ],
  server: {
    port: 3000,
    strictPort: true,
  }
})
