(function() {
  var controllers = angular.module("controllers");

  controllers.controller("RTwoCtrl", ["$scope", "$log", function($scope, $log, $cookies) {
    $log.info("RTwoCtrl init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("RTwoCtrl destroy...");
    });


  }]);

})();