# Webpack tutorial

## 7. Development и Production конфигурация

### 1) Разделение конфигурационных файлов Webpack:

Скопируем файл `webpack.config.js` и назовем его `webpack.prod.js`, а оригинальный переименуем в `webpack.dev.js`.

Далее нам нужно обновить скрипты в `package.json`:

```json
"scripts": {
    "dev": "webpack-dev-server --open --config webpack.dev.js",
    "build": "NODE_ENV=production webpack --config webpack.prod.js"
  }
```

_Мы задаем скрипку конфиг с которым будет запускаться webpack._

_Также мы указали_ `NODE_ENV=production` _чтобы явно указать что билд происходит в продакшн среде._

_Это делается для конфигурации postcss, что бы по условию экспортировался конфиг с разных содеражием._

### 2) Изменяем webpack.dev.js:

Нам здесь ненужен `MiniCssExrtactPlugin.loader`. Удаляем, а на его место ставим `style-loader`. Также удаляем его из плагинов, ведь нам ненужно формировать `css-файл` при `development` моде:

```javascript
{
  test: /\.scss$/i,
  use: [
    // Подключаем style-loader снова
    'style-loader',
    // Включаем мапы для css. Но зачем и для других?
    {loader: 'css-loader', options: {sourceMap: true}},
    {loader: 'postcss-loader', options: {sourceMap: true}},
    {loader: 'sass-loader', options: {sourceMap: true}},
   ]
}
```

_Я пока не понимаю важность исходных карт для разработки и отладки._

Также включим исходные карты для `javascript`:

```javascript
module.exports = {
  // Включаем режим разработки. Зачем тогда в указываем в package.json?
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map', // <- Влючаем карты
  devServer: {
    static: './dist',
  },
  // ... Какой-то код ...
}
```

### 3) Изменяем webpack.prod.js:

Здесь нам просо нужно изменить мод на `production`:

```javascript
module.exports = {
  mode: 'production',
  // ...
}
```

### 4) Изменяем postcss.config.js (подключаем cssnano):

```javascript
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: {},
    }
  }
} else {
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
}
```

_Здесь по условию импортируем модули с конфигурацией._

_Именно для этого в скрипте мы указывали_ `NODE_ENV=production`.

`postcss.config.js` _не срабатывае и не минифицирует_ `css`,  _если не указать мод в_ `package.json`.

### 5) Открытые вопросы:

Важен ли порядок в расположения плагинов?