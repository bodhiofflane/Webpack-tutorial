# Webpack tutorial

## 2. Сервер разработки Webpack и Hot Module Reloading (HMR)

### 1) Установка Webpack Dev Server:

```
npm install --save-dev webpack-dev-server
```

### 1.1) Установка плагина HtmlWebpackPlugin:

```
npm install --save-dev webpack-dev-server
```

Этот плагин будет автоматически генерировать html.

_Понадобится для того что бы сервер что-то возвращал._

### 2) Настройка конфига:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // Сообщяем серверу откуда сервить файлы, не собитая в ./dist.
  // Работает только со свойством static. Свойство contentBase - выдает ошибку.
  devServer: {
    static: './dist',
  },
  // Здесь массив плагинов. Всегда используем инстанс.
  // Почему-то js файл подключился к html, в херед автоматически.
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
```

### 3) Создаем скрипт для разработки:

```json
"scripts": {
   // Запуск сервера с автоматическим открытием в браузере
  "dev": "webpack-dev-server --open",
  "build": "webpack"
},
```

Теперь при запуске скрипта у нас запускается сервер и поддерживается Hot Reloading.