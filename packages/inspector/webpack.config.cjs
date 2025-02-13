const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: argv.mode,
    entry: isDevelopment ? './src/index.tsx' : './src/index.tsx',
    cache: isDevelopment ? false : true,
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/', // ensure dynamic chunks are fetched from the correct HTTP location
      filename: isDevelopment ? 'index.js' : 'inspector.js',
      chunkFilename: '[name].[id].[contenthash].js', // make sure lazy-loaded chunks have a proper filename
      library: isDevelopment ? undefined : {
        type: 'module'
      },
      clean: true
    },
    experiments: isDevelopment ? undefined : {
      outputModule: true
    },
    externals: {

    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
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
        }
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
      static: [{
        directory: path.join(__dirname, 'public'),
      },
      {
        directory: path.resolve(__dirname, '../logs-react/dist'),
        publicPath: '/' 
      }],
      hot: true,
      open: true,
      port: 3001,
    }
  };
}; 