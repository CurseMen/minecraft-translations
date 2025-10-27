import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // With a custom domain, the base path should always be the root '/'.
  // The conditional logic for GitHub subdirectories is no longer needed.
  base: '/',
});
