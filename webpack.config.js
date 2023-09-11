const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExrtactPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    static: './dist', // Сообщяем серверу откуда сервить файлы, не собитая в ./dist.
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExrtactPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new MiniCssExrtactPlugin({
      filename: '[name].css',
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
