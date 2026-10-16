import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages project URL: https://exc7567.github.io/homyResidence/
  // When you connect the custom domain (homyresidence.id) later,
  // build with VITE_BASE=/ or change the fallback below to '/'.
  base: process.env.VITE_BASE || '/homyResidence/',
});