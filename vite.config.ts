import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
  }

  if (command !== 'serve') {
    // ЗАМЕНИТЕ 'minecraft-translations' на название вашего репозитория
    config.base = '/minecraft-translations/' 
  }

  return config
})
