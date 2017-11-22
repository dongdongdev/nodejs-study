(function() {
  var controllers = angular.module("controllers");

  controllers.controller("ROneCtrl", ["$scope", "$log", "$http", function($scope, $log, $http) {
    $log.info("ROneCtrl init...");
    var senddata = {
      "Echo": "dfdf",
      "PageInfo": {
        "PageNumber": 1
      },
      "Infos": ["abc", "123", "abc123"]
    };

    $http({
      "method": "POST",
      "url": "http://localhost:6286/Test",
      "data": senddata
    }).then(function(data, status) {
      $log.debug("http 应答数据:", data.data);
      $scope.data = data.data;
    }, function(data, status) {
      $log.error("http 错误:", data);
    });

    // 处理scope销毁
    $scope.$on("$destroy", function() {
      $log.debug("ROneCtrl destroy...");
    });


  }]);

})();