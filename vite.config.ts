import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import * as path from 'path';

// Custom plugin to copy PWA files to dist
const copyPwaFiles = () => {
  return {
    name: 'copy-pwa-files',
    closeBundle: async () => {
      const files = ['manifest.json', 'sw.js', 'icon.png'];
      
      // Ensure dist exists
      if (!fs.existsSync('dist')) {
         fs.mkdirSync('dist');
      }

      for (const file of files) {
        const srcPath = path.resolve(__dirname, file);
        const destPath = path.resolve(__dirname, 'dist', file);

        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`✅ Copied ${file} to dist/`);
        } else {
            // THROW ERROR if icon is missing so you know immediately
            if (file === 'icon.png') {
              console.error(`\n\n❌ ERROR: icon.png is MISSING in the root directory!\nPlease place 'icon.png' next to 'package.json' and 'vite.config.ts'.\n\n`);
            } else {
              console.warn(`⚠️ Warning: ${file} not found in root.`);
            }
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
  base: './', 
  publicDir: false, 
});