import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3006, 
    open: true, 
    host: true, 
    strictPort: true 
  },
  resolve: {
    alias: {
      // Thiết lập tất cả các import từ src
      '@': path.resolve('.', './src'),
      // Tự động giải quyết tất cả các import từ src
      // Ví dụ: "routes" sẽ trỏ đến "src/routes"
      '~': path.resolve('.', './src'),
    }
  }
})
