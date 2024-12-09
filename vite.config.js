import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  base: '/',
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        login: resolve(__dirname, './auth/login/index.html'),
        auth: resolve(__dirname, './auth/index.html'),
        register: resolve(__dirname, './auth/register/index.html'),
        profile: resolve(__dirname, './profile/index.html'),
        post: resolve(__dirname, './listing/index.html'),
        createPost: resolve(__dirname, './listing/create/index.html'),
      },
    },
  },
  define: {
    'import.meta.env.VITE_API_KEY': JSON.stringify(
      process.env.VITE_API_KEY || ''
    ),
    'import.meta.env.VITE_NOROFF_API_BASE_URL': JSON.stringify(
      process.env.VITE_NOROFF_API_BASE_URL || ''
    ),
  },
});
