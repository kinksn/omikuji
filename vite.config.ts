import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/omikuji/',
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./192.168.11.9-key.pem'),
      cert: fs.readFileSync('./192.168.11.9.pem'),
      }
    },
})
