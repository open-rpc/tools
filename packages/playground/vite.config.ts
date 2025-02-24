import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['path'],
      globals: {
        Buffer: true,
      },
    }),
  ],
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
    include: ['events'],
    exclude: ['monaco-editor'],
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    global: 'globalThis',
  },
  worker: {
    format: 'es',
  },
});
