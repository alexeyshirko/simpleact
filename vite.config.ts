import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'jsx-runtime': resolve(__dirname, 'src/jsx/runtime.ts'),
      },
      name: 'Simpleact',
      fileName: 'index.esm.js',
    },
    minify: true,
  },
});
