
// gulpfile.js
// Require the needed packages
var gulp = require('gulp');
var haml = require('gulp-ruby-haml');
var coffee = require('gulp-coffee');
var connect = require('gulp-connect');
var s3 = require("gulp-s3");

gulp.task('deploy', function() {
  var sys=require("sys"), fs=require("fs");
  aws = JSON.parse(fs.readFileSync('./aws.json'));
  gulp.src('./public/**').pipe(s3(aws));
});

gulp.task('haml', function() {
  gulp.src('./src/haml/*.haml').
       pipe(haml()).
       pipe(gulp.dest('./public'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('coffee', function() {
  gulp.src('./src/javascript/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./public/assets/javascript'))
});



gulp.task('watch', function() {
  gulp.watch('./src/javascript/*.coffee', ['coffee']);
  gulp.watch('./src/haml/**/*.haml', ['haml']);
});


gulp.task('default', ['haml', 'watch', 'coffee', 'connect']);
