var gulp = require('gulp');
var webpack = require("webpack");
var webpack_config = require('./webpack.config.js')
var inject = require('gulp-inject');
var clean = require('gulp-clean');

gulp.task('clean' , () => {
  return gulp.src('./public')
    .pipe(clean());
});

gulp.task('copy-deps', ['clean'], () => {
  return gulp.src('./client/vendor/**')
    .pipe(gulp.dest('./public/vendor'));
});

gulp.task('copy-data', ['copy-deps'], () => {
  return gulp.src('./client/img/**')
    .pipe(gulp.dest('./public/img'));
});

gulp.task('build-dev', ['copy-data'], (callback) => {
  return webpack(webpack_config, (err, stats) => {
    if(err) {
      console.log('Something wrong happened!');
    }
    callback();
    return gulp.src('./client/index.html')
      .pipe(gulp.dest('./public/'))
      .pipe(inject(gulp.src(['./public/vendor/jquery/jquery.js', './public/vendor/materialize/js/materialize.js', './public/index.js']), {relative: true}))
      .pipe(inject(gulp.src(['./public/vendor/materialize/css/materialize.css', './public/vendor/materialize-local-icons/css/material-icons.css']), {relative: true}))
      .pipe(gulp.dest('./public/'));
  });
});

