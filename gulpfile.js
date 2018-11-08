var del = require('del');
var gulp = require('gulp');
var cache = require('gulp-cache');
var cssnano = require('gulp-cssnano');
var htmlMin = require('gulp-htmlmin');
var gulpIf = require('gulp-if');
var imageMin = require('gulp-imagemin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
});

gulp.task('minify-css', function() {
    return gulp.src('app/css/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function() {
    return gulp.src('temp/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-html', function() {
    return gulp.src('app/**/*.html')
        .pipe(htmlMin({
            collapseBooleanAttributes: true,
            conservativeCollapse: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imageMin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('clean:temp', function() {
    return del.sync('temp');
});

gulp.task('cache:clear', function(callback) {
    return cache.clearAll('callback');
});

gulp.task('babel', function() {
    return gulp.src([
            'app/js/main.js',
            'js/*.js'
        ])
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('temp'))
});

gulp.task('build', function(callback) {
    runSequence('clean:dist',
        ['sass', 'babel', 'images', 'fonts'],
        ['minify-css', 'minify-js', 'minify-html'],
        'clean:temp',
        callback
    )
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'watch'],
        callback
    )
});
