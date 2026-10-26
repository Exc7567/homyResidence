import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { roomVideosPlugin } from './scripts/room-videos.mjs';

export default defineConfig({
  // roomVideosPlugin: lists public/property-videos/ for the room cards (see scripts/room-videos.mjs).
  plugins: [react(), tailwindcss(), roomVideosPlugin()],
  // Custom domain https://www.homyresidence.id (public/CNAME) serves the site from the root.
  base: '/',
});
