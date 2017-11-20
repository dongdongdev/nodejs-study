(function() {
  var controllers = angular.module("controllers");

  controllers.controller("RootCtrl", ["$scope", "$log", function($scope, $log) {
    $log.info("RootCtrl初始化。。。");
    $scope.welcome = "欢迎使用angularjs";
  }]);

})();