const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExrtactPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExrtactPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExrtactPlugin({
      filename: '[name].css',
    }),
  ],
});
