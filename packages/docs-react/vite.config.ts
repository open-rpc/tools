import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DocsReact',
      fileName: format => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@mui/material',
        '@mui/icons-material',
        '@mui/lab',
        '@mui/styles',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MuiMaterial',
          '@mui/icons-material': 'MuiIcons',
          '@mui/lab': 'MuiLab',
          '@mui/styles': 'MuiStyles',
        },
      },
    },
  },
});
