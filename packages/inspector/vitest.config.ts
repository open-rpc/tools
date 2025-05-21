import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@open-rpc/monaco-editor-react': resolve(__dirname, './__mocks__/monaco.ts'),
      '@open-rpc/logs-react': resolve(__dirname, './__mocks__/logs-react.ts'),
      'monaco-editor': resolve(__dirname, './__mocks__/monaco-editor.ts'),
      'monaco-editor/esm/vs/editor/editor.worker?worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/editor/editor.worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/language/json/json.worker?worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/language/json/json.worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/language/css/css.worker?worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/language/css/css.worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/language/html/html.worker?worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/language/html/html.worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/language/typescript/ts.worker?worker': resolve(__dirname, './__mocks__/worker.ts'),
      'monaco-editor/esm/vs/language/typescript/ts.worker': resolve(__dirname, './__mocks__/worker.ts'),
      './containers/userWorker': resolve(__dirname, './__mocks__/worker.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
