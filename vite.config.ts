import { defineConfig,UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(<UserConfigExport>{
  plugins: [vue(),vueJsx()],
  resolve: {
    alias: {
      '@': '/src',
      '~@': '/src'
    }
  },
  server: {
    host: true,
    proxy:{
      '/api':{
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
