import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Custom domain https://www.homyresidence.id (public/CNAME) serves the site from the root.
  base: '/',
});
