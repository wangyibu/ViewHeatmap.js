var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// gulp.task('copydir1', function() {
//     gulp.src('dir1/**')
//         .pipe(copy())
//         .pipe(gulp.dest('dir2/'));
// });

gulp.task('jsConcat', function () {
    return gulp.src('build/focusHeatmap.js')
        .pipe(concat('focusHeatmap.min.js'))
        //   .pipe(uglify())
        .pipe(gulp.dest('build'));
});


gulp.task('watch_src', function () {
    gulp.watch('build/focusHeatmap.js', ['jsConcat']);
});