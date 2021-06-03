'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const { output, filename } = require('./config');

sass.compiler = require('sass');

function compile() {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(concat(filename))
    .pipe(gulp.dest(output));
}

gulp.task('build', compile);

gulp.task('build:watch', function () {
  compile();
  gulp.watch('./src/**/*.scss', compile);
});