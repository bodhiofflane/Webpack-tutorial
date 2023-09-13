# Webpack tutorial

## 9. Code Splitting

Есть несколько вариантов разделение кода. Самый простой это - `Entry Point`.

Мы рассмотрим `Prevent Duplication`. Его суть в том что если у нас несколько точек входа из `.js`, то сторонюю библиотеку которую мы используем в точке, мы выносим в отдельный `chunk`. Это предотвращает подтягивание сторонней библиотеки в каждый `.js` файл.

### 1) Создаем новый Entry:

Создаем `./src/js`, перемещаем туда наш `index.js` и создаем внутри `sum.js`.

### 2) Подключаем Entries в webpack.common.js:

```javascript
module.exports = {
  entry: {
    // Указываем зависимости
    index: {import: './src/js/index.js', dependOn: 'shared'},
    sum: {import: './src/js/sum.js', dependOn: 'shared'},
    shared: 'lodash', // <- Это имя библиотеки?
  },
  // ...
}
```

_Документация советует не делать несколько точек входа а использовать импорты.... Уточнить._

### 3) Указываем Webpack что код нужно разделить на чанки:

```javascript
  // ...
  output: {
    // Указываем что .js файлы будут иметь такое именование
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    // Хз что это и зачем. В доке 0 пояснений. В сборке нет разницы... вроде бы
    // runtimeChunk: 'single',
    //  Вот эта часть сообщает Webpack что код нужно разделить на части, основываясь на конфигурации в свойстве entry
    splitChinks: {
      chunks: 'all'
    }
  }
  // ...
```

### 4) Установим библиотеку Lodash для примера:

```bash
npm i lodash
```

В `index.js`:

```javascript
import _ from 'lodash';
import '../styles/main.scss';

console.log(_.join(['index', 'module', 'loaded'], ' '));
```

В `sum.js`:

```javascript
import _ from 'lodash';

console.log(_.join(['sum', 'module', 'loaded'], ' '));
```

### 5) Сборка проекта:

В итоге у нас появляется `index.bundle.js`, `sum.bundle.js` и `shared.bundle.js` на 20 тысяц строк... , но в браузере запускается.

_Внутри_ `index.bundle.js` _и_ `sum.bundle.js` _при использовании_ `lodash`, _функции ссылаются на_ `shared.budle.js`.

### 6) Открытые вопросы:

Почему в `shared.bundle.js` 20 тысяч строк?

Сплитить код нужно только в `prod` сборке?
