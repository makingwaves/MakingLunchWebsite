const { src, dest, series} = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlMin = require('gulp-htmlmin');
const imageMin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');

function clean() {
    return del('dist');
}

function images() {
    return src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imageMin({interlaced: true})))
        .pipe(dest('dist/images'))
}

function fonts() {
    return src('app/fonts/**/*')
        .pipe(dest('dist/fonts'))
}

function css() {
    return src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('dist/css'))
}

function js() {
    return src(['app/js/main.js',])
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

function html() {
    return src('app/**/*.html')
        .pipe(htmlMin({
            collapseBooleanAttributes: true,
            conservativeCollapse: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true
        }))
        .pipe(dest('dist'));
}

exports.build = series(clean, js, css, html, fonts, images);

