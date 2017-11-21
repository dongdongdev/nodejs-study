(function() {
  //第一个myapp的模块，引用controllers模块
  var app = angular.module("myapp", ["ngRoute", "controllers"]);
  // 初始化controllers模块
  angular.module("controllers", []);
  //配置日志是否开启debug
  app.config(["$logProvider", function($logProvider) {
    $logProvider.debugEnabled(true);
  }]);
  // 配置路由
  app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("", {
      templateUrl: "/templates/welcome.html"
    }).when("/", {
      templateUrl: "/templates/welcome.html"
    }).when("/rone", {
      templateUrl: "/templates/rone.html"
    }).when("/rtwo", {
      templateUrl: "/templates/rtwo.html"
    }).otherwise({
      templateUrl: "templates/welcome.html"
    });
  }]);

})();