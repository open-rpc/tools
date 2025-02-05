import { defineConfig } from 'vite';
import { react } from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        // ... your other entries
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
        'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
        'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
        'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
      },
    },
  },
  worker: {
    format: 'es',
    plugins: [react()],
  },
});
