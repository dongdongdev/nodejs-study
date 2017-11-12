# gulp目录
- 前言([返回到项目目录](README.md))
- [gulp安装](#gulp安装)
## 前言
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