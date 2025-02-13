import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'monaco-editor/esm/vs/editor/editor.worker':
        'monaco-editor/esm/vs/editor/editor.worker?worker',
      'monaco-editor/esm/vs/language/json/json.worker':
        'monaco-editor/esm/vs/language/json/json.worker?worker',
      'monaco-editor/esm/vs/language/css/css.worker':
        'monaco-editor/esm/vs/language/css/css.worker?worker',
      'monaco-editor/esm/vs/language/html/html.worker':
        'monaco-editor/esm/vs/language/html/html.worker?worker',
      'monaco-editor/esm/vs/language/typescript/ts.worker':
        'monaco-editor/esm/vs/language/typescript/ts.worker?worker',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['events'],
    exclude: ['monaco-editor'],
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'Inspector',
      fileName: format => `inspector.${format}.js`,
      formats: ['es', 'cjs'],
    },

    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'monaco-editor'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  worker: {
    format: 'es',
  },
});
