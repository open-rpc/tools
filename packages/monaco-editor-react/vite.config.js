import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@mui/material', 'monaco-editor', /^monaco-editor\/.*/],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': '@mui/material',
          'monaco-editor': 'monaco'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['monaco-editor']
  },
  worker: {
    format: 'es',
  }
});
