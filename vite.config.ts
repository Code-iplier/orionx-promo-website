import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const basePath = process.env.BASE_PATH || '/';
const normalizedBase = basePath.endsWith('/') ? basePath : basePath + '/';

export default defineConfig({
  base: normalizedBase,
  plugins: [react()],
});
