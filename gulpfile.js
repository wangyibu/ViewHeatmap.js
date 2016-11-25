var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('copydir1', function () {
    gulp.src('dir1/**')
        .pipe(copy())
        .pipe(gulp.dest('dir2/'));
});

gulp.task('t1', function () {
    return gulp.src('src/**/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dest'));
});


gulp.task('wa', function () {
    gulp.watch('**/*.ts', ['tsc']);
});


gulp.task('tsc', function() {
    return gulp.src('**/*.ts')
        .pipe(ts());
        // .pipe(tsProject());
});