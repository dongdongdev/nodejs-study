const gulp = require("gulp");
const jshint = require("gulp-jshint");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const mincss = require("gulp-clean-css");
const del = require("del");
const sync = require("gulp-file-sync");
const watch = require("gulp-watch");

const baseDir = "myapp/";

/*清理发布*/
gulp.task("clear", function() {
  del.sync(["dist/\*\*/\*"], {
    force: true
  });
});

/*js第三方库打包*/
gulp.task("jslib", function() {
  var libs = [];
  libs.push(baseDir + "lib/js/jquery.min.js");
  libs.push(baseDir + "lib/js/bootstrap.min.js");
  libs.push(baseDir + "lib/js/angular.min.js");

  return gulp.src(libs).pipe(concat("lib.min.js")).pipe(gulp.dest(baseDir + "dist/js/"));
});

/*css第三方库打包*/
gulp.task("csslib", function() {
  var libs = [];
  libs.push(baseDir + "lib/css/bootstrap.min.css");
  return gulp.src(libs).pipe(concat("lib.min.css")).pipe(gulp.dest(baseDir + "dist/css/"));
});

/*字体文件处理*/
gulp.task("fonts", function() {
  sync(baseDir + "lib/fonts", baseDir + "dist/fonts");
});

/*图片文件处理*/
gulp.task("images", function() {
  sync(baseDir + "src/images", baseDir + "dist/images");
});

/*项目html文件*/
gulp.task("html", function() {
  sync(baseDir + "src/html/templates", baseDir + "dist/templates");
  gulp.src(baseDir + "src/html/index.html")
    .pipe(gulp.dest(baseDir + "dist/"));
});

/*项目js文件*/
gulp.task("js", function() {
  var jsfiles = [];
  jsfiles.push(baseDir + "src/js/config.js");
  jsfiles.push(baseDir + "src/js/controllers/**/*.js");
  jsfiles.push(baseDir + "src/js/startup.js");

  return gulp.src(jsfiles)
    .pipe(plumber())
    .pipe(jshint()).pipe(jshint.reporter("default"))
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest(baseDir + "dist/js/"));
});

gulp.task("css", function() {
  var cssfiles = [];
  cssfiles.push(baseDir + "src/css/*.css");
  return gulp.src(cssfiles)
    .pipe(plumber())
    .pipe(concat("app.min.css"))
    .pipe(mincss())
    .pipe(plumber.stop())
    .pipe(gulp.dest(baseDir + "dist/css"));
});

/*默认打包任务*/
gulp.task("default", ["clear", "jslib", "csslib", "fonts", "images", "html", "js", "css"], function() {
  console.log("打包任务完成");
});