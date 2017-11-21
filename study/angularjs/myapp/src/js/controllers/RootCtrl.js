(function() {
  var controllers = angular.module("controllers");

  controllers.controller("RootCtrl", ["$scope", "$log", function($scope, $log) {
    $log.debug("RootCtrl init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("RootCtrl destroy...");
    });

    $scope.welcome = "欢迎使用angularjs";
  }]);

})();