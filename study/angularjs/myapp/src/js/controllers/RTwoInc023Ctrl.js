(function() {
  var controllers = angular.module("controllers");

  controllers.controller("RTwoInc023", ["$scope", "$log", function($scope, $log) {
    $log.debug("RTwoInc023 init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("RTwoInc023 destroy...");
    });

    $scope.$on("message1", function(event, data) {
      $log.debug("mesage1", data);
      $scope.message1 = data;
    });

    $scope.$on("message2", function(event, data) {
      $log.debug("mesage2", data);
      $scope.message2 = data;
    });

    $scope.$on("message3", function(event, data) {
      $log.debug("mesage3", data);
      $scope.message3 = data;
    });

  }]);

})();