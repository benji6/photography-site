var autoprefixer = require('gulp-autoprefixer');
var babel = require("gulp-babel");
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minifycss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require("gulp-uglify");
var watchify = require('watchify');
var createGalleryData = require('./createGalleryData.js');

gulp.task("html", function () {
  gulp.src('./src/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./dist/'));
});

gulp.task("jsDist", function () {
  var bundler = watchify(browserify('./src/js/main.js', watchify.args));

  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source("bundle.js"))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(babel())
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist'));
});

gulp.task("jsDev", function () {
  var bundler = watchify(browserify('./src/js/main.js', watchify.args));

  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source("bundle.js"))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  gulp.src('./src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: [
        'last 3 versions'
      ],
      cascade: false
    }))
    .pipe(minifycss())
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist'));
});

gulp.task('createGalleryData', createGalleryData);

gulp.task("watch", function () {
  gulp.start("createGalleryData", "html", "jsDev", "sass");
  gulp.watch('dist/images/**/*.jpg', ["createGalleryData"]);
  gulp.watch('src/index.html', ["html"]);
  gulp.watch('src/js/**/*.js', ["jsDev"]);
  gulp.watch('src/sass/style.scss', ["sass"]);
});

gulp.task("build", ["createGalleryData", "html", "jsDist", "sass"]);

gulp.task("default", ["watch"]);
