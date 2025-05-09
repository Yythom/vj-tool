import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './public/manifest.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // crx({
    //   manifest,
    //   contentScripts: {
    //     preambleCode: false,
    //     injectCss: false
    //   }
    // }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        content: 'src/chrome-js/content.ts',
        background: 'src/chrome-js/background.ts'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'content') {
            return 'content.js'
          } else if (chunkInfo.name === 'background') {
            return 'background.js'
          }
          return '[name].js'
        }
      }
    }
  }
})
