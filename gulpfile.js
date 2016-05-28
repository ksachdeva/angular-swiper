'use strict';

var gulp       = require('gulp');
var server     = require('gulp-webserver');
var ngAnnotate = require('gulp-ng-annotate');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');

gulp.task('serve', function() {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('dist', function() {
    return gulp.src([
            'src/**/*.module.js',
            'src/**/*.provider.js',
            'src/**/*.directive.js'
        ])
        .pipe(ngAnnotate())
        .pipe(concat('angular-swiper.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', function() {
    return gulp.src([
            'src/**/*.module.js',
            'src/**/*.provider.js',
            'src/**/*.directive.js'
        ])
        .pipe(ngAnnotate())
        .pipe(concat('angular-swiper.js'))
        .pipe(gulp.dest('dist'));
});