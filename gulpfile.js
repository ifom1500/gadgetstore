const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const stylelint = require('gulp-stylelint');
const htmlmin = require("gulp-htmlmin");

const uglify = require("gulp-uglify");
const eslint = require("gulp-eslint");
const concat = require("gulp-concat");
const babel = require("gulp-babel");


const rename = require("gulp-rename");
const del = require("del");
const browserSync = require("browser-sync").create();

const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgSprite = require("gulp-svg-sprite");

// Styles

const sass2css = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}

exports.sass2css = sass2css

const scssLinter = () => {
  return gulp.src("source/sass/**/*.scss")
    .pipe(plumber())
    .pipe(stylelint({
      fix: true,
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .pipe(plumber.stop())
}

exports.scssLinter = scssLinter

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/**/*.js")
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
}

exports.scripts = scripts

const jsLinter = () => {
  return gulp.src("source/js/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

exports.jsLinter = jsLinter

// Vendors

// const jsVendors = () => {
//   return gulp.src(["node_modules/..."])
//     .pipe(concat("libs.js"))
//     .pipe(gulp.dest("build/js/vendors/"));
// }

// exports.jsVendors = jsVendors

// Images

const images = () => {
  return gulp.src([
    "source/img/**/*.{jpg,png,svg}",
    "!source/img/sprite/*.svg"
  ])
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 85, progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,jpeg,png}")
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp

// Sprite

const svg2Sprite = () => {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { sortAttrs: true }
        ]
      })
    ]))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        },
      },
    }))
    .pipe(gulp.dest("build/img/sprite"))
}

exports.svg2Sprite = svg2Sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/**/*.{ttf,woff2,woff}",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

const copyImages = (done) => {
  gulp.src([
    "source/img/**/*.{jpg,jpeg,png,svg,gif}",
    "!source/img/sprite/*.svg"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copyImages = copyImages;

// Clean

const clean = () => {
  return del("build")
}

exports.clean = clean

// Server

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  browserSync.reload();
  done();
}

exports.reload = reload

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("sass2css"));
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/js/**/*.js", gulp.series("scripts"));
}

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(
    html,
    sass2css,
    scssLinter,
    scripts,
    jsLinter,
    svg2Sprite,
    copy,
    copyImages
  ),
  gulp.series(
    server,
    watcher
  ));

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    html,
    sass2css,
    scssLinter,
    scripts,
    jsLinter,
    svg2Sprite,
    copy,
    createWebp,
    images
  ),
  gulp.series(
    server,
    watcher
  ));

exports.build = build;
