"use strict";
// CREDIT: https://www.webstoemp.com/blog/switching-to-gulp4/

const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const livereload = require("gulp-livereload");
const minifyCSS = require("gulp-minify-css");
const plumber = require("gulp-plumber");
const del = require("del");

// Browser Sync
function serve(done) {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
    },
    port: 8996,
  });
  done();
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Clean Assets Folder
function clean() {
  return del(["public/assets/"]);
}

// sass to CSS
function toCSS() {
  return (
    gulp
      .src(["src/styles.scss"], { base: "." })
      .pipe(plumber())
      .pipe(sass())
      // .pipe(minifyCSS())
      .pipe(rename("styles.css"))
      .pipe(gulp.dest("public/assets/css"))
      .pipe(browserSync.stream())
  );
}

// Transpile, concatenate and minify scripts (returns a stream)
// function scripts() {
//   return (
//     gulp
//       .src(["./assets/js/**/*"])
//       .pipe(plumber())
//       .pipe(webpackstream(webpackconfig), webpack)
//       .pipe(uglify())
//       // folder only, filename is specified in webpack config
//       .pipe(gulp.dest("./_site/assets/js/"))
//       .pipe(browsersync.stream())
//   );
// }
const watch = () => {
  gulp.watch("src/**/*.html", browserSyncReload);
  gulp.watch("./index.html", browserSyncReload);
  gulp.watch("src/**/*.scss", gulp.series(toCSS, browserSyncReload));
  // gulp.watch("src/**/*.scss", gulp.series(toCSS, browserSyncReload));
};

const start = gulp.series(
  clean,
  gulp.parallel(clean, gulp.series(serve, toCSS, watch))
);

exports.start = start;
