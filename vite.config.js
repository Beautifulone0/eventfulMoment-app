import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    sourcemap: false, // Ensure sourcemaps are enabled
  },
});