import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Custom plugin to copy PWA files to dist
const copyPwaFiles = () => {
  return {
    name: 'copy-pwa-files',
    closeBundle: async () => {
      const files = ['manifest.json', 'sw.js'];
      for (const file of files) {
        if (fs.existsSync(file)) {
          fs.copyFileSync(file, `dist/${file}`);
          console.log(`Copied ${file} to dist/`);
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyPwaFiles()],
  build: {
    outDir: 'dist',
  },
  publicDir: false, // We handle assets manually or via imports
});