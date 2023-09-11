# Webpack tutorial

## 2. CSS и SCSS Loaders

### 1) Установка загрузчиков:

```
npm install --save-dev style-loader css-loader
```

_В чем их отличие? Что например делает_ ``css-loader``_?_


### 1.1) Также установим загрузчик Sass-Loader и библиотеку Sass:

```
npm install --save-dev sass-loader sass
```

``sass-loader`` _требует что бы мы установили библиотеку_ ``sass``.


### 2) Обновляем правила в конфигурационном файле Webpack:

```javascript
  module: {
    rules: [
      {
        ...
      },
      {
        test: /\.scss$/i,
        // Порядок загрузчиков важен
        use: [
          'style-loader', // 3. А вот это хз что
          'css-loader', // 2. Потом css в стили
          'sass-loader', // 1. Сначала обрабатываем sass в css
        ]
      },
    ],
  },
```

### 3) Используем scss-стили:

Создадим ``./srs/styles/main.scss`` со сделующим содержимым:

```scss
// Переменная
$body-color: red;

body {
  // Используем переменную
  background-color: $body-color;
}
```
Далее нужно подключить ``scss-файл`` к ``index.js``. Все должно проходить через ``index.js``, потому как это ``entry-point`` указанный в Webpack.

```javascript
// index.js
import './styles/main.scss';
// ... Какой-то код ...
```

### 4) Открытые вопросы:

Что делает ``style-loader``?

Почему стили даже после билда хранятся в теге ``<style>``?

Как получить отдельный ``css-файл`` в бандл?
