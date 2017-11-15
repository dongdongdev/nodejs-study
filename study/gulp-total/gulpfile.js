const gulp = require("gulp");
const jshint = require("gulp-jshint");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const mincss = require("gulp-clean-css");
const del = require("del");
const watch = require("gulp-watch");
const browserSync = require('browser-sync').create();

gulp.task("clear", function() {
  del.sync(["dist/\*\*/\*"], {
    force: true
  });
});

gulp.task("jslib", function() {
  var libs = [];
  libs.push("lib/js/jquery.min.js");
  libs.push("lib/js/bootstrap.min.js");
  libs.push("lib/js/vue.min.js");

  return gulp.src(libs).pipe(concat("lib.min.js")).pipe(gulp.dest("dist/"));
});

gulp.task("csslib", function() {
  var libs = [];
  libs.push("lib/css/bootstrap.min.css");
  return gulp.src(libs).pipe(concat("lib.min.css")).pipe(gulp.dest("dist/"));
});

gulp.task("libs", ["jslib", "csslib"], function() {
  console.log("libs...");
});

gulp.task("html", function() {
  return gulp.src(["src/html/**/*.html"]).pipe(gulp.dest("dist/"));
});

gulp.task("js", function() {
  var jsfiles = ["src/js/index*.js"];
  return gulp.src(jsfiles)
    .pipe(plumber())
    .pipe(jshint()).pipe(jshint.reporter("default"))
    .pipe(concat("index.min.js"))
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest("dist/"));
});

gulp.task("css", function() {
  var cssfiles = [];
  cssfiles.push("src/css/common.css");
  cssfiles.push("src/css/index.css");
  return gulp.src(cssfiles)
    .pipe(plumber())
    .pipe(concat("index.min.css"))
    .pipe(mincss())
    .pipe(plumber.stop())
    .pipe(gulp.dest("dist/"));
});

gulp.task("app", ["html", "js", "css"], function() {
  console.log("app");
});

gulp.task("watch", function() {
  //检查dist目录
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });
  gulp.watch(["dist/**/*"]).on("change", browserSync.reload);


  watch(["src/js/**/*"], function() {
    gulp.start("js");
  });

  watch(["src/css/**/*"], function() {
    gulp.start("css");
  });

  watch(["src/html/**/*.html"], function() {
    gulp.start("html");
  });

});

gulp.task("default", function() {
  gulp.start("clear");
  gulp.start("libs");
  gulp.start("app");
});