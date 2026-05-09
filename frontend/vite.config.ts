import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 5173,
      hmr: process.env.DISABLE_HMR !== 'true',
      // Proxy API calls to FastAPI backend — avoids CORS in dev
      proxy: {
        '/auth':      { target: 'http://localhost:8000', changeOrigin: true },
        '/trainers':  { target: 'http://localhost:8000', changeOrigin: true },
        '/sessions':  { target: 'http://localhost:8000', changeOrigin: true },
        '/ai':        { target: 'http://localhost:8000', changeOrigin: true },
        '/dashboard': { target: 'http://localhost:8000', changeOrigin: true },
        '/ws':        { target: 'ws://localhost:8000',   changeOrigin: true, ws: true },
      },
    },
  };
});
