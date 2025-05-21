import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'monaco-editor': resolve(__dirname, './__mocks__/monaco-editor.ts'),
      'monaco-editor/esm/vs/editor/editor.worker?worker': resolve(__dirname, './__mocks__/worker.ts'),
      '@open-rpc/monaco-editor-react': resolve(__dirname, './__mocks__/monaco.ts'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
