(function() {
  var controllers = angular.module("controllers");

  controllers.controller("RTwoCtrl", ["$scope", "$log", function($scope, $log) {
    $log.info("RTwoCtrl init...");

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("RTwoCtrl destroy...");
    });

    $scope.nowpage = "";
    var temp = "templates/rtwo/";

    $scope.changePage = function(page) {
      $scope.nowpage = page;
      $scope.page = temp + $scope.nowpage + ".html";
    };

    $scope.changePage("inc01");


  }]);

})();