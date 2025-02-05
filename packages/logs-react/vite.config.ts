import { defineConfig } from 'vite';

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
  optimizeDeps: {
    exclude: ['monaco-editor'],
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@mui/material', '@mui/icons-material', 'monaco-editor'],
    },
  },
  worker: {
    format: 'es',
  },
});
