import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const alias = {
  '@open-rpc/json-schema-to-react-tree': resolve(__dirname, '../json-schema-to-react-tree/src'),
};

export default defineConfig({
  resolve: { alias },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
