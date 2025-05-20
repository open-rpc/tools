import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
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
      formats: ['es', 'cjs'],
      fileName: format => (format === 'cjs' ? 'index.cjs.js' : 'index.es.js'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@mui/material',
        '@mui/material/styles',
        '@mui/icons-material',
        '@mui/lab',
        'monaco-editor',
        '@open-rpc/monaco-editor-react',
      ],
    },
  },
  worker: {
    format: 'es',
  },
});
