import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DocsReact',
      formats: ['es', 'umd'],
      fileName: (format) => `docs-react.${format === 'umd' ? 'umd.js' : 'js'}`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@material-ui/core',
        '@material-ui/icons',
        '@material-ui/lab',
        '@material-ui/styles'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@material-ui/core': 'MaterialUI',
          '@material-ui/icons': 'MaterialUIIcons',
          '@material-ui/lab': 'MaterialUILab',
          '@material-ui/styles': 'MaterialUIStyles'
        }
      }
    }
  }
}) 