import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['events'],
  },
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    lib:
      process.env.BUILD_MODE === 'lib'
        ? {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'DocsReact',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs'],
          }
        : undefined,
    rollupOptions:
      process.env.BUILD_MODE === 'lib'
        ? {
            external: [
              'react',
              'react-dom',
              '@mui/material',
              '@mui/icons-material',
              '@mui/lab',
              '@mui/material/styles',
            ],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                '@mui/material': 'MuiMaterial',
                '@mui/icons-material': 'MuiIcons',
                '@mui/lab': 'MuiLab',
              },
            },
          }
        : undefined,
  },
});
