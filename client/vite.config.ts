import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: { port: 5173 },
  optimizeDeps: {
    include: ['socket.io-client'],
  },
  plugins: [tailwindcss(), react(), tsconfigPaths()],
  resolve: {
    alias: [{ find: '@/', replacement: resolve(__dirname, './src') }],
  },
});

