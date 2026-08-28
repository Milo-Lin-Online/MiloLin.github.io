import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Must match the repo name for GitHub Pages project sites.
  // If you move to a custom domain (milolinonline.com), change this to '/'.
  base: '/MiloLin.github.io/',
  build: {
    target: 'es2020',
    cssMinify: true,
  },
});
