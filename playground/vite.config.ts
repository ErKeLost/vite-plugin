import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import imagemin from 'unplugin-imagemin/vite';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  // base: '/pathe/',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    // assetsInlineLimit: 4096 * 2,
  },
  server: {
    port: 8451,
  },
  // publicDir: 'base/public',
  plugins: [
    vue(),
    imagemin({
      compress: {
        jpg: {
          quality: 10,
        },
        jpeg: {
          quality: 10,
        },
        png: {
          quality: 10,
        },
        webp: {
          quality: 0,
        },
      },
      conversion: [
        { from: 'jpeg', to: 'webp' },
        { from: 'jpg', to: 'webp' },
        { from: 'png', to: 'webp' },
      ],
    }),
  ],
});
