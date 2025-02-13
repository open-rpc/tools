import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';

const isServe = process.argv.includes('--serve');

/** @type {esbuild.BuildOptions} */
const buildOptions = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  sourcemap: true,
  metafile: true,
  minify: !isServe,
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'jsx',
    '.worker.js': 'file',
  },
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['public/*'],
        to: ['dist'],
      },
    }),
  ],
  define: {
    'process.env.NODE_ENV': isServe ? '"development"' : '"production"',
  },
};

if (isServe) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  
  const { host, port } = await ctx.serve({
    servedir: 'dist',
    port: 3000,
  });
  
  console.log(`Server running at http://${host}:${port}`);
} else {
  await esbuild.build(buildOptions);
} 