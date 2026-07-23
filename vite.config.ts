import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    /** @see https://vite.dev/config/build-options#build-lib */
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Simpleact',
      fileName: (format) => {
        if (format === 'cjs') return 'index-[hash].cjs.js';
        return `index.${format}.js`;
      },
      formats: ['cjs'],
    },

    /** @deprecated rolldownOptions */
    /** @see https://vite.dev/config/build-options#build-rollupoptions */
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        minifyInternalExports: true,
      },
    },

    /** @see https://vite.dev/config/build-options#build-minify */
    minify: 'terser',

    /** @see https://terser.org/docs/api-reference/#minify-options */
    terserOptions: {

      /** @see https://terser.org/docs/options/#compress-options */
      compress: {
        pure_funcs: ['console.log'],
        passes: 2,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_undefined: true,
      },

      /** @see https://terser.org/docs/options/#format-options */
      format: {
        comments: false,
        beautify: false,
        ecma: 5,
      },
    },
  },
});
