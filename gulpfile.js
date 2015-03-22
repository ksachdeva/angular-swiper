var gulp = require('gulp');
var server = require('gulp-webserver');

gulp.task('serve', function() {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});