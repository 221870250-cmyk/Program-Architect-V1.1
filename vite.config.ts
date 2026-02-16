import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';

// Custom plugin to copy PWA files to dist
const copyPwaFiles = () => {
  return {
    name: 'copy-pwa-files',
    closeBundle: async () => {
      // Added icon.png to the list of files to copy
      const files = ['manifest.json', 'sw.js', 'icon.png'];
      for (const file of files) {
        if (fs.existsSync(file)) {
          // Ensure dist exists before copying (usually does, but safety first)
          if (!fs.existsSync('dist')) {
             fs.mkdirSync('dist');
          }
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
  publicDir: false, 
});