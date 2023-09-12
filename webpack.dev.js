const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // Добавляем мапы. Они помогут при отладке приложения
  devtool: 'inline-source-map',
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
          'style-loader',
          // Включаем мапы для css. Но зачем и для других?
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
