# Webpack tutorial

## 2. Post Css и Mini Css Extract Plugin

### 1) Установка загрузчика:

```
npm install --save-dev postcss-loader
```

### 2) Установка postCss-библиотек:

_В примере использовались другие библиотеки, но этими я чаще пользуюсь._

```
npm install -D tailwindcss postcss autoprefixer
```

### 3) Установка Mini Css Extract Plugin:

```
npm install --save-dev mini-css-extract-plugin
```

_Как я понял, этот плагин извлекает css из js и помещает его к бандлу как .css файл_.

### 4) Настройка конфигурации загрузчика:

```javascript
{
  test: /\.scss$/i,
  use: [
    {
      loader: MiniCssExrtactPlugin.loader,
      options: {
        // ... Всякие оптимизационные моменты ...
      }
    },
    // Теперь нам не нужен style-loader
    //'style-loader',
    'css-loader',
    // Так же добавляем postcss-загрузчик
    'postcss-loader',
    'sass-loader',
   ]
}
```

_Здесь так же важен порядок расположения загрузчиков._

_Следует обратить внимение что первый загрузчик здесь_ `MiniCssExtractPlugin.Loader`

### 4.1) Подключение самого плагина:

```javascript
plugins: [
  new HtmlWebpackPlugin({
    title: 'Development',
  }),
  new MiniCssExrtactPlugin({
    // Имя для css-файла которое будет передаватся из исходника
    filename: '[name].css',
  })
]
```

### 5) Конфигурация postcss.config.js:

_Конфигурацию можно не писать в отдельном файле, а добавить напрямую в_ `webpack.config.js`:

```javascript
rules: [
  {
    test: /\.css$/i,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                // "postcss-preset-env", хз что это
                'tailwindcss',
                'autoprefixer',
              ],
            ],
          },
        },
      },
    ],
  },
];
```
_Вроде бы так... Неуверен..._

Но мы сделаем с конфигурационным файлом `postcss.config.js`:

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 6) Также нам понадобится .browserlistrc для автопрефиксера и прочего:

```
last 2 years
> 1%
not dead
```

_Нужно для autoprefixer, stylelint, babel-preset-env и cssnext, что бы разработчик мог разом указать список браузеров, которые нужно поддерживать в проекте._


### 7) Открытые вопросы:

Borwserslistrc считывается автоматически?

Где для него взять стандарный конфиг?

Как подключить `nano-css`?

