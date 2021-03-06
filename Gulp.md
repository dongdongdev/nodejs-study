# gulp目录
- 前言
- [gulp安装](#gulp安装)
- [gulp管道](#gulp管道)
- [gulp-jshint js代码检查](#gulp-jshint)
- [gulp-concat 文件合并](#gulp-concat)
- [gulp-uglify js压缩和混淆](#gulp-uglify)
- [gulp-plumber gulp异常处理](#gulp-plumber)
- [gulp-clean-css css压缩](#gulp-clean-css)
- [del 文件删除](#del)
- [gulp-file-sync 文件同步](#gulp-file-sync)
- [gulp-watch 文件检查](#gulp-watch)
- [简单的gulp整合演示](study/gulp-total/)
## 前言
[gulp官方网站](http://www.gulpjs.com.cn/) | [返回到项目目录](README.md)  
如果没有nodejs基础知识，请先查看[nodejs安装和初体验](Nodejs.md)  

## gulp安装
- 命令行中执行`cnpm install -g gulp`全局安装gulp插件
- 创建[项目目录](study/gulp/)
- 切换到项目目录执行`cnpm install --save-dev gulp`安装gulp插件
- 创建[gulp配置文件-gulpfile.js](study/gulp/gulpfile.js)
- 编写内容  
    const gulp = require("gulp");  
    gulp.task("default", function() {  
     console.log("gulp你好");  
    }); 
- 命令行中执行`gulp`测试
- 解释：gulp.task定义可执行任务,第一个参数是任务的名称（default是默认任务，执行gulp时没有指定任务名称时执行），第二个参数是要执行的function

## gulp管道
- 在项目目录里面创建[src目录](study/gulp/src)  
- 创建一些html,js,css文件，js和css放置到不同的目录  
- 编辑gulpfile.js  
- 添加内容  
    gulp.task("pipe",function(){  
        return gulp.src(["src/\*\*/\*"]).pipe(gulp.dest("dist/"));  
    });  
- 命令行中执行`gulp pipe`测试，src中文件都将复制到dist目录中
- 解释：gulp.src定义源文件,参数是文件名称列表\*\*表示任意层级目录，\*表示任意文件名称，gulp.dest定义目标目录，参数是目录名称，不可以通配符，可以不存在，会自动创建出来，pipe就是管道操作，从pipe前面的位置流向()指定的目标

## gulp-jshint
- gulp-jshint是js代码检查的gulp插件，[官方网站](https://www.npmjs.com/package/gulp-jshint)
- 项目目录执行`cnpm install --save-dev jshint gulp-jshint`安装gulp-jshint插件
- 编辑gulpfile.js  
- 添加内容  
    const jshint = require("gulp-jshint");  
    gulp.task("jshint", function() {  
        return gulp.src(["src/js/\*\*/\*.js"]).pipe(jshint()).pipe(jshint.reporter("default"));  
    });    
- 命令行中执行`gulp jshint`测试，js目录中的所有js文件都会进行语法检查，如果有语法错误信息（错误的位置和愿意）jshit将会显示在控制台
- 解释：gulp.src定义要检查的js文件,通过管道交给jshint()对象处理，再通过管道jshint.reporter对象显示错误报告，这里体现了gulp管道优秀的地方，不会生成中间临时处理文件

## gulp-concat
- gulp-concat是文件合并的gulp插件，[官方网站](https://www.npmjs.com/package/gulp-concat)
- 项目目录执行`cnpm install --save-dev gulp-concat`安装gulp-concat插件
- 编辑gulpfile.js  
- 添加内容  
     const concat = require("gulp-concat");  
     gulp.task("appjs", function() {
         return gulp.src(["src/js/\*\*/\*.js"]).pipe(concat("app.js")).pipe(gulp.dest("dist/js/"));
     });
- 命令行中执行`gulp appjs`测试，js目录中的所有js文件都会合并到dest/js/app.js中
- 解释：gulp.src定义要合并的js文件，通过管道交给concat合并成app.js，再通过管道输出到dist/js/目录

## gulp-uglify
- gulp-uglify是js文件压缩混淆的gulp插件，[官方网站](https://www.npmjs.com/package/gulp-uglify)
- 项目目录执行`cnpm install --save-dev gulp-uglify`安装gulp-uglify
- 编辑gulpfile.js  
- 添加内容  
     const uglify = require("gulp-uglify");  
     gulp.task("appminjs", function() {
         return gulp.src(["src/js/\*\*/\*.js"]).pipe(concat("app.min.js")).pipe(uglify()).pipe(gulp.dest("dist/js/"));
     });  
- 命令行中执行`gulp appminjs`测试，js目录中的所有js文件都会合并并压缩混淆到dest/js/app.min.js中
- 解释：gulp.src定义要合并的js文件，通过管道交给concat合并成app.min.js，自动通过管道交给uglify插件压缩混淆，再通过管道输出到dist/js/目录  

## gulp-plumber
- gulp-plumber是错误处理的gulp插件，[官方网站](https://www.npmjs.com/package/gulp-plumber)
- 项目目录执行`cnpm install --save-dev gulp-plumber`安装gulp-plumber
- 编辑gulpfile.js  
- 添加内容  
     const plumber = require("gulp-plumber");  
     gulp.task("jsall", function() {
         return gulp.src(["src/js/\*\*/\*.js"]).pipe(plumber()).pipe(jshint()).pipe(jshint.reporter("default")).pipe(concat("app.min.js")).pipe(uglify()).pipe(plumber.stop()).pipe(gulp.dest("dist/js/"));
     });  
- 命令行中执行`gulp jsall`测试，js目录中的所有js文件都会先检查语法然后合并并压缩混淆到dest/js/app.min.js中
- 解释：plumber的作用是在错误发生后不会打断程序的运行，显示错误信息后会继续执行后续动作，plumber.stop()将会恢复原始流程  

## gulp-clean-css
- gulp-clean-css是css文件压缩的gulp插件，[官方网站](https://www.npmjs.com/package/gulp-clean-css)
- 项目目录执行`cnpm install --save-dev gulp-clean-css`安装gulp-clean-css
- 编辑gulpfile.js  
- 添加内容  
     const mincss = require("gulp-clean-css");  
     gulp.task("appmincss", function() {
         return gulp.src(["src/css/\*\*/\*.css"]).pipe(concat("app.min.css")).pipe(mincss()).pipe(gulp.dest("dist/css/"));
     });  
- 命令行中执行`gulp appmincss`测试，css目录中的所有css文件都会合并并压缩到dest/js/app.min.css中
- 解释：gulp-clean-css压缩css文件

## del
- del是删除文件的插件，[官方网站](https://www.npmjs.com/package/del)
- 项目目录执行`cnpm install --save-dev del`安装del
- 编辑gulpfile.js  
- 添加内容  
     const del = require("del");  
     gulp.task("clear", function() {  
        del.sync([ "dist/\*\*/\*" ], {  
            force : true  
        });  
     });  
- 命令行中执行`gulp clear`测试，dist目录中的所有文件都会被删除
- 解释：del用于文件删除

## gulp-file-sync
- gulp-file-sync是文件同步的gulp插件，[官方网站](https://www.npmjs.com/package/gulp-file-sync)
- 项目目录执行`cnpm install --save-dev gulp-file-sync`安装gulp-file-sync
- 编辑gulpfile.js  
- 添加内容  
     const sync = require("gulp-file-sync");  
     gulp.task("filesync", function() {  
        sync("src/", "build/");  
     });  
- 命令行中执行`gulp filesync`测试，src目录中的所有文件都会被同步到build目录
- 解释：gulp-file-sync用于文件同步

## gulp-watch
- gulp-watch是文件变化检查的gulp插件，[官方网站](https://www.npmjs.com/package/gulp-watch)
- 项目目录执行`cnpm install --save-dev gulp-watch`安装gulp-watch
- 编辑gulpfile.js  
- 添加内容  
     const watch = require("gulp-watch");  
     gulp.task("watch", function() {  
       return watch("src/js/\*\*/\*.js", function() {  
         gulp.start("jsall");  
       });  
     });   
- 命令行中执行`gulp watch`测试，js文件发生变化后会自动执行jsall任务
- 解释：gulp-watch用于文件检测