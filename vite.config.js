import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // <-- allow access from network
    port: 5173,
    allowedHosts: ['netflix-react-68l1.onrender.com']
  }
})

