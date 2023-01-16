import { defineConfig } from 'vite'
import inject from '@rollup/plugin-inject'
import react from '@vitejs/plugin-react-swc'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'globalThis',
    'process.env': process.env,
  },
  plugins: [nodePolyfills(), react()],
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['Buffer', 'Buffer'], process: 'process' })],
    }
  }
})
