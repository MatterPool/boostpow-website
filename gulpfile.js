var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('bundle-files', function() {
  gulp
    .src(['./dist/runtime.*.js', './dist/polyfills.*.js', './dist/main.*.js'])
    .pipe(concat('StmtOfAccountAppBundleJS.resource'))
    .pipe(gulp.dest('./staticresources/'));

  gulp
    .src(['./dist/styles.*.css'])
    .pipe(concat('StmtOfAccountAppBundleCSS.resource'))
    .pipe(gulp.dest('./staticresources/'));

  return gulp
    .src(['./dist/runtime.*.js', './dist/polyfills.*.js', './dist/main.*.js'])
    .pipe(concat('full-bundle.js'))
    .pipe(gulp.dest('./dist/'));
});
