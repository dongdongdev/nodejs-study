(function() {
  //第一个myapp的模块，引用controllers模块
  var app = angular.module("myapp", ["controllers"]);
  // 初始化controllers模块
  angular.module("controllers", []);
  //配置日志是否开启debug
  app.config(["$logProvider", function($logProvider) {
    $logProvider.debugEnabled(true);
  }]);

})();