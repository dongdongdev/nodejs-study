(function() {
  //第一个myapp的模块，引用controllers模块
  var app = angular.module("myapp", ["controllers"]);
  // 初始化controllers模块
  angular.module("controllers", []);
  //配置日志是否开启debug
  app.config(["$logProvider", function($logProvider) {
    $logProvider.debugEnabled(false);
  }]);

})();
(function() {
  //获取控制器模块
  var controllers = angular.module("controllers");
  //第一个叫RootCtrl的控制器, 依赖注入$scope作用域对象和$log日志对象
  controllers.controller("RootCtrl", ["$scope", "$log", function($scope, $log) {
    //通过日志输出测试信息
    $log.info("RootCtrl初始化。。。");
    $log.debug("演示查错信息输出");
    $log.error("演示错误信息输出。。。");

    //作用域数据和方法测试
    $scope.count = 1;
    $scope.add = function() {
      $scope.count++;
    };
  }]);
})();
(function() {
  //当文档加载完毕的时候将myapp模块和document绑定
  angular.element(document).ready(function() {
    angular.bootstrap(document, ["myapp"]);
  });
})();