// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        host: true,
        allowedHosts: ['1fed83a30185.ngrok-free.app'],
    },
    base: '/FrankoITday/',  // 👈 тут вкажи точну назву репозиторію
});
