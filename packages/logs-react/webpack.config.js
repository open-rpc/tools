const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: argv.mode,
    entry: './src/index.tsx',
    cache: false,
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'index.js',
      chunkFilename: '[name].[id].[contenthash].js',
      library: isDevelopment ? undefined : {
        type: 'module'
      },
      clean: true
    },
    experiments: isDevelopment ? undefined : {
      outputModule: true
    },
    externals: isDevelopment ? {} : {

      'monaco-editor': 'monaco-editor',
      'react': {
        module: 'react',
        },
        'react-dom': {
          module: 'react-dom',
        },
      '@mui/material': {
        module: '@mui/material',
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env", { "modules": false }],
                '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.ttf$/,
          type: 'asset/resource'
        },
        /*{
          test: /editor\.worker\.js$/,
          include: /monaco-editor/,
          use: [
            {
              loader: 'worker-loader',
              options: {
                filename: '[name].worker.js',
                esModule: false,
                publicPath: '/'
              }
            }
          ]
        },
        {
          test: /json\.worker\.js$/,
          include: /monaco-editor/,
          use: [
            {
              loader: 'worker-loader',
              options: {
                filename: '[name].worker.js',
                esModule: false,
                publicPath: '/'
              }
            }
          ]
        }*/
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['json'],
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      open: true,
      port: 3000,
    }
  };
}; 