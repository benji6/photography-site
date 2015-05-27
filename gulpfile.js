const autoprefixer = require('gulp-autoprefixer');
const babel = require("gulp-babel");
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
const gulp = require('gulp');
const gutil = require('gulp-util');
const minifycss = require('gulp-minify-css');
const minifyHTML = require('gulp-minify-html');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
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
  const bundler = watchify(browserify('./src/js/main.js', watchify.args));

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
  const bundler = watchify(browserify('./src/js/main.js', watchify.args));

  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source("bundle.js"))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(distPath));
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
    .pipe(gulp.dest(distPath));
});

gulp.task('createGalleryData', createGalleryData);

gulp.task("watch", function () {
  gulp.start("createGalleryData", "html", "jsDev", "sass", "connect");
  gulp.watch(distPath + 'images/**/*.jpg', ["createGalleryData"]);
  gulp.watch('src/index.html', ["html"]);
  gulp.watch('src/js/**/*.js', ["jsDev"]);
  gulp.watch('src/sass/**/*.scss', ["sass"]);
  gulp.watch(distPath + "*", ["reload"]);
});

gulp.task("build", ["createGalleryData", "html", "jsDist", "sass"]);

gulp.task("default", ["watch"]);
