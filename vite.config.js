import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This MUST match your repository name exactly
  base: '/Personal-information/', 
})