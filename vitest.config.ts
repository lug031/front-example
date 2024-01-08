// vitest.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
    }),
  ],
  test: {
    globals: true,
    //environment: 'happy-dom',
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '~': '.',
      '@': '.',
    },
  },
});
