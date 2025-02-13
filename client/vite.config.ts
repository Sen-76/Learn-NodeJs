import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  resolve: {
    alias: [{ find: '@/', replacement: resolve(__dirname, './src') }],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/comments/querydatagrid': 'http://localhost:3000',
    },
  },
});

