(function() {
  var controllers = angular.module("controllers");

  controllers.controller("RTwoInc01", ["$scope", "$log", "MyUtilService", "$interval", function($scope, $log, MyUtilService, $interval) {
    $log.debug("RTwoInc01 init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("RTwoInc01 destroy...");
      $interval.cancel(timer);
    });

    $scope.inputdata = "";

    $scope.test = MyUtilService.trim(" ab 123 ");

    $scope.nowdate = MyUtilService.formatDate(new Date().getTime(), "y年M月d日 h:m:s w");



    $scope.showtime = new Date().getTime();
    $scope.changeTime = function() {
      $log.debug("更改时间");
      $scope.showtime = new Date().getTime();
    };

    var timer = $interval($scope.changeTime, 1000);

  }]);

})();