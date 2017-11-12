 //导入gulp
 const gulp = require("gulp");
 //导入gulp-jshint
 const jshint = require("gulp-jshint");
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