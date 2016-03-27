const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
const cssnext = require('cssnext');
const csswring = require('csswring');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const minifyHTML = require('gulp-minify-html');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require("gulp-uglify");
const watchify = require('watchify');
const createGalleryData = require('./createGalleryData.js');

const distPath = "dist/";

gulp.task("clean", function () {
  return del([
    distPath + "/**/*.map",
  ]);
});

gulp.task("connect", function () {
  return connect.server({livereload: true});
});

gulp.task("reload", function () {
  return gulp.src(distPath).pipe(connect.reload());
});

gulp.task("html", function () {
  return gulp.src('./src/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest(distPath));
});

gulp.task("jsDist", function () {
  return watchify(browserify('./src/js/main.js', watchify.args))
    .transform(babelify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source("bundle.js"))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('dist'));
});

gulp.task("jsDev", function () {
  return watchify(browserify('./src/js/main.js', watchify.args))
    .transform(babelify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source("bundle.js"))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(distPath));
});

gulp.task("css", function () {
  return gulp.src("src/css/style.css")
    .pipe(plumber())
    .pipe(postcss([
      cssnext(),
      csswring,
    ]))
    .pipe(gulp.dest(distPath));
});

gulp.task("createGalleryData", createGalleryData);

gulp.task("watch", function () {
  gulp.watch(distPath + 'images/**/*.jpg', ["createGalleryData"]);
  gulp.watch('src/index.html', ["html"]);
  gulp.watch('src/js/**/*.js', ["jsDev"]);
  gulp.watch('src/css/**/*.css', ["css"]);
  gulp.watch(distPath + "**/*", ["reload"]);
});

gulp.task("build", function () {
  return runSequence(["clean", "createGalleryData", "html", "jsDist", "css"]);
});

gulp.task("default", ["watch", "createGalleryData", "html", "jsDev", "css", "connect"]);
