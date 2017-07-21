'use strict';

var gulp = require('gulp'),
    bump = require('gulp-bump'),
    watch = require('gulp-watch'),
    haml = require('gulp-haml'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    // zip = require('gulp-zip'),
    reload = browserSync.reload,
    // include = require('gulp-file-include'),
    cleanCSS = require('gulp-clean-css');

var path = {
    bowerDir: './bower_components',
    bump: ['./bower.json', './package.json'],
    // zip: {
    // 	source: 'dist/*',
    // 	dest: ''
    // },
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        haml: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'build/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: {
        build: './build',
        dist: './dist'
    }
};

var config = {
    server: {
        baseDir: "./build"
    },
    host: 'localhost',
    port: 9000,
    logPrefix: "Symphony"
};

gulp.task('html:build', function () {
    gulp.src(path.src.haml)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true, indent: true}));
});

gulp.task('html:dist', function () {
    gulp.src(path.src.haml)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('style:dist', function () {
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('image:dist', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img));
});

// gulp.task('fonts:build', function () {
// 	gulp.src(path.src.fonts)
// 		.pipe(gulp.dest(path.build.fonts));
// });

gulp.task('fonts:build', function() {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('fonts:dist', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:dist', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('build', ['clean:build'], function() {
    gulp.start('project:build');
});

gulp.task('dist:major', ['clean:dist'], function() {
    gulp.start('project:dist');
    gulp.src(path.bump)
        .pipe(bump({type: 'major'}))
        .pipe(gulp.dest('./'));
});

gulp.task('dist:patch', ['clean:dist'], function() {
    gulp.start('project:dist');
    gulp.src(path.bump)
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('dist:prerelease', ['clean:dist'], function() {
    gulp.start('project:dist');
    gulp.src(path.bump)
        .pipe(bump({type: 'prerelease'}))
        .pipe(gulp.dest('./'));
});

gulp.task('dist', ['clean:dist'], function() {
    gulp.start('project:dist');
});

gulp.task('project:build', ['html:build', 'style:build', 'image:build', 'fonts:build', 'js:build']);

gulp.task('project:dist', ['html:dist', 'style:dist', 'image:dist',  'fonts:dist', 'js:dist']);

/* Настроить автоматическую подготовку архива */
// gulp.task('zip', ['dist'], function() {
// 	gulp.src(path.zip.source)
// 		.pipe(zip('dist.zip'))
// 		.pipe(gulp.dest(path.zip.dest));
// });

gulp.task('watch', ['build'], function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('webserver', ['build'], function () {
    browserSync(config);
});

gulp.task('clean:build', function (cb) {
    rimraf(path.clean.build, cb);
});

gulp.task('clean:dist', function (cb) {
    rimraf(path.clean.dist, cb);
});

gulp.task('default', ['webserver', 'watch']);