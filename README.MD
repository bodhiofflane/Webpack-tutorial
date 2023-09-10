# Webpack tutorial

## 2. Установка и настройка Webpack

### 1) Установка Webpack:

```
npm install webpack webpack-cli --save-dev
```

### 2) Создание конфигурационного файла:

В корневой директории созаем файл ``webpack.config.js``

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### 3) Создание скрипта:

В package.json создаём скрипт:

```json
"scripts": {
    "build": "webpack"
  }
```

Теперь для сборки нам всего лишь нужно запусить скрипт в терменале:

```
npm run build
```