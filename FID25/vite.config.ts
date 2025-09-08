import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: ['1fed83a30185.ngrok-free.app'],
  },
  base: '/', //this is base url for gh-pages deployment, also change package.json "homepage" field
});
