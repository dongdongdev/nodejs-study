(function() {
  var controllers = angular.module("controllers");

  controllers.controller("WelcomeCtrl", ["$scope", "$log", "$cookies", "$window", function($scope, $log, $cookies, $window) {
    $log.info("WelcomeCtrl初始化。。。");

    $scope.action = "";
    $scope.cookieValue = $cookies.get("mycookie");

    $scope.saveCookie = function() {
      $cookies.put("mycookie", $scope.cookieValue);
      $scope.action = "保存cookie：" + $scope.cookieValue;
    };

    $scope.removeCookie = function() {
      $cookies.remove("mycookie");
      $scope.action = "移除cookie：" + $scope.cookieValue;
    };

    $scope.localValue = $window.localStorage["mylocal"];

    $scope.saveLocal = function() {
      $window.localStorage["mylocal"] = $scope.localValue;
      $scope.action = "保存本地储存：" + $scope.localValue;
    };

    $scope.removeLocal = function() {
      delete $window.localStorage["mylocal"];
      $scope.action = "移除本地储存：" + $scope.cookieValue;
    };

  }]);

})();