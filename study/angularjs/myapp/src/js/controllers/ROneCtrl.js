(function() {
  var controllers = angular.module("controllers");

  controllers.controller("ROneCtrl", ["$scope", "$log", function($scope, $log, $cookies) {
    $log.info("ROneCtrl init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("ROneCtrl destroy...");
    });


  }]);

})();