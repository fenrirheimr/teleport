# Шаблон фронтенда сайта
для быстрого старта

## Установка Node.js и NPM

`sudo apt-get update`<br>
`sudo apt-get install nodejs`<br>
`sudo apt-get install npm`

## Установка Gulp.js и Bower.js

`sudo npm install gulp -g`<br>
`sudo npm install bower -g `<br>
`sudo ln -s /usr/bin/nodejs /usr/bin/node`

далее вытягиваем проект с гитхаба

`git clone git@github.com:fenrirheimr/project-template.git`

## Инициализация

`cd <путь к папке>`<br>
`npm init`<br>
`npm install` — установит все модули gulp из `package.json`<br>
`bower install` — установит все пакеты bower из `bower.json`

## package.json

- `browser-sync` — автообновление страницы в браузере при редактировании файлов;
- `gulp-autoprefixer` — втоматически проставляет префиксы к css свойствам;
- `gulp-bump` — следит за репозиторием и обновляет package.json;
- `gulp-clean-css` — оптимизирует `css`;
- `gulp-haml` — модуль для работы с haml;
- gulp-imagemin — оптимизация графики;
- imagemin-pngquant — приблуда для оптимизация графики работает в связке с `gulp-imagemin`;
- gulp-rigger — позволяет импортировать один файл в другой простой конструкцией: `//= footer.html`;
- gulp-sass — модуль для работы с `sass/scss`;
- gulp-watch — нужен для наблюдения за изменениями файлов;
- gulp-zip — архивирует папки и файлы;
- inputmask — маска для input;

...

<!--
```
bootstrap/
├── css/
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   └── bootstrap.min.css.map
└── js/
    ├── bootstrap.js
    └── bootstrap.min.js
```
-->