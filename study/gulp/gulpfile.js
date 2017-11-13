 //导入gulp
 const gulp = require("gulp");
 //导入gulp-jshint
 const jshint = require("gulp-jshint");
 //导入gulp-concat
 const concat = require("gulp-concat");
 //导入gulp-uglify
 const uglify = require("gulp-uglify");
 //导入gulp-plumber
 const plumber = require("gulp-plumber");
 //默认任务
 gulp.task("default", function() {
     console.log("gulp你好");
 });
 //pipe管道复制
 gulp.task("pipe", function() {
     return gulp.src(["src/**/*"]).pipe(gulp.dest("dist/"));
 });
 //js代码检查
 gulp.task("jshint", function() {
     return gulp.src(["src/js/**/*.js"]).pipe(jshint()).pipe(jshint.reporter("default"));
 });
 //js文件合并
 gulp.task("appjs", function() {
     return gulp.src(["src/js/**/*.js"]).pipe(concat("app.js")).pipe(gulp.dest("dist/js/"));
 });
 //js文件压缩混淆
 gulp.task("appminjs", function() {
     return gulp.src(["src/js/**/*.js"]).pipe(concat("app.min.js")).pipe(uglify()).pipe(gulp.dest("dist/js/"));
 });
 //js文件压缩混淆
 gulp.task("jsall", function() {
     return gulp.src(["src/js/**/*.js"]).pipe(plumber()).pipe(jshint()).pipe(jshint.reporter("default")).pipe(concat("app.min.js")).pipe(uglify()).pipe(plumber.stop()).pipe(gulp.dest("dist/js/"));
 });