
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: format => `index.${format === 'es' ? 'es.js' : 'cjs'}`,
    },

    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
    sourcemap: true,
    outDir: 'dist',
  },
});
