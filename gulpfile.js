'use strict';

var gulp = require('gulp');
var server = require('gulp-webserver');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

gulp.task('serve', function() {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('dist', function() {
    return gulp.src('src/angular-swiper.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});