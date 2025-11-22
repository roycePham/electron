import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    base: './',   // ⚠ quan trọng: dùng relative path để Electron tìm file
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'),
        }
    }
})