# Webpack tutorial

## 8. Общая конфигурация

### 1) Установка модуля для слияния кофигов:

В первую очередь нам нужно установить модуль `webpack-merge`:

```
npm install --save-dev webpack-merge
```

### 2) Создание webpack.common.js:

Нужно создать файл `webpack.common.js` с общим для `dev` и `prod` содержимым:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      // Общий конгфик для модов разработки
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
    ],
  },
  plugins: [
    // Общий для модов разработки
    new HtmlWebpackPlugin(),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```
_Здесь не используется_ `mode` _, не обрабатываются стили и убран_ `title` _из плагина генерирующего_ `html`.

### 3) Изменение webpack.dev.js:

Здесь нам наоборот, нужно удалить общие настройки конфигурации и указать только уникальные на `dev` режима.

Также следует импорировать модуль `webpack-merge` и `webpack.common.js`.

```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
});

```

_Здесь мы удалили все общие конфигурации и оставили только те, которые отноятся к_ `dev` _режиму._

_Также мы обернули импортируемый объект в вызов функции_ `merge`.

### 4) Изменение webpack.prod.js:

```javascript
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
```

_Здесь абсолютно такая же история. Оставили только то, что уникально для режима_ `production`. _А именно обработку css._