import { defineConfig } from 'vite'

export default defineConfig({
  base: '/country-info-app/', // Это должно соответствовать имени вашего репозитория
  server: {
    proxy: {
      '/api': {
        target: 'https://restcountries.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})