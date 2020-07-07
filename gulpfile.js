var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('bundle-files', function() {
  return gulp
    .src(['./dist/runtime.*.js', './dist/polyfills.*.js', './dist/main.*.js'])
    .pipe(concat('full-bundle.js'))
    .pipe(gulp.dest('./dist/'));
});
