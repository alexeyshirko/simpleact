import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  server: {
    port: 3000,
  },
  /** @see https://oxc.rs/docs/guide/usage/transformer/jsx.html */
  oxc: {
    jsx: {
      runtime: 'automatic',
      importSource: 'simpleact',
    },
  },
  resolve: {
    alias: {
      'simpleact/jsx-dev-runtime': resolve(__dirname, '../src/jsx/dev-runtime.ts'),
    },
  },
});
