(function() {
  var controllers = angular.module("controllers");

  controllers.controller("RTwoInc022", ["$rootScope", "$scope", "$log", function($rootScope, $scope, $log) {
    $log.debug("RTwoInc022 init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("RTwoInc022 destroy...");
    });

    $scope.message = "";

    $scope.send = function() {
      $log.debug("send:", $scope.message);
      $scope.$broadcast("message1", "$scope级别广播" + $scope.message);
      $rootScope.$broadcast("message2", "$rootScope级别广播" + $scope.message);
      $scope.$emit("message3", "$scope级别发布" + $scope.message);
    };

  }]);

})();