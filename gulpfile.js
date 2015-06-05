const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
const cssnext = require('cssnext');
const csswring = require('csswring');
const gulp = require('gulp');
const gutil = require('gulp-util');
const minifyHTML = require('gulp-minify-html');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const postcssNested = require('postcss-nested');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require("gulp-uglify");
const watchify = require('watchify');
const createGalleryData = require('./createGalleryData.js');

const distPath = "dist/";

gulp.task("connect", function () {
  connect.server({livereload: true});
});

gulp.task("reload", function () {
  gulp.src(distPath).pipe(connect.reload());
});

gulp.task("html", function () {
  gulp.src('./src/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest(distPath));
});

gulp.task("jsDist", function () {
  watchify(browserify('./src/js/main.js', watchify.args))
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
  watchify(browserify('./src/js/main.js', watchify.args))
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
      postcssNested(),
      cssnext(),
      csswring,
    ]))
    .pipe(gulp.dest(distPath));
});

gulp.task('createGalleryData', createGalleryData);

gulp.task("watch", function () {
  gulp.start("createGalleryData", "html", "jsDev", "css", "connect");
  gulp.watch(distPath + 'images/**/*.jpg', ["createGalleryData"]);
  gulp.watch('src/index.html', ["html"]);
  gulp.watch('src/js/**/*.js', ["jsDev"]);
  gulp.watch('src/css/**/*.css', ["css"]);
  gulp.watch(distPath + "*", ["reload"]);
});

gulp.task("build", ["createGalleryData", "html", "jsDist", "css"]);

gulp.task("default", ["watch"]);
