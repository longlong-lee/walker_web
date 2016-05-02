var path = require('path');
var gulp = require('gulp');
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var del = require('del');
var md5 = require("gulp-md5-plus");
var rename = require("gulp-rename");

gulp.task('clean', function () {
  del.sync('./dist/**');
});

gulp.task('minify-js', function () {
  gulp.src('./lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/javascripts'));
});

gulp.task('minify-css', function () {
  gulp.src('./stylesheets/**/*.css')
    .pipe(minifycss())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('html', function () {
  gulp.src('./public.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('fonts', function () {
  gulp.src('./fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('zip', function () {
  gulp.src('./dist/**')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['clean'], function () {
  gulp.start('html', 'minify-css', 'minify-js', 'fonts');
});

gulp.task('aa', function(){
  gulp.src('./dist/stylesheets/*.css')
    .pipe(md5(10,'./dist/index.html'))
    .pipe(gulp.dest('./dist/stylesheets/'));
  gulp.src('./dist/javascripts/*.js')
    .pipe(md5(10,'./dist/index.html'))
    .pipe(gulp.dest('./dist/javascripts/'));
})
