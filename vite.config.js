import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Custom domain (homyresidence.id) serves from root. For a project URL like
  // https://USERNAME.github.io/REPO/ set VITE_BASE=/REPO/ at build time.
  base: process.env.VITE_BASE || '/',
});
