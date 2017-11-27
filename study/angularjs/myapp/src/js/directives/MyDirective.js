(function() {
  var app = angular.module("myapp");

  app.directive("dirOne", ["$log", "$interval", function($log, $interval) {
    $log.debug("directive dir-one init ...");

    return {
      scope: {
        dirOne: "@"
      },
      link: function($scope, element, attr) {
        var count = 1;
        var title = "计数器";
        $log.debug("dir-one：", element, attr, $scope.dirOne);
        var watch = $scope.$watch("dirOne", function(nv, ov) {
          $log.debug("dirOne变化：", nv, ov);
          title = nv;
        });

        element.html(title + "：" + count);
        var timer = $interval(function() {
          count++;
          $log.debug("修改内容", count);
          element.html(title + ":" + count);
        }, 5000);

        $scope.$on("$destroy", function() {
          $log.debug("directivedir-one destroy...");
          $interval.cancel(timer);
        });
      }
    };
  }]);

  app.directive("showTime", ["$log", "MyUtilService", function($log, MyUtilService) {
    $log.debug("directive show-time...");
    return {
      scope: {
        showTime: "@"
      },
      "link": function($scope, element, attr) {
        $log.debug("directive show-time element:", element);
        var format = element.attr("format");
        if (MyUtilService.trim(format) == "") {
          format = "y-M-d";
        }
        var watch = $scope.$watch("showTime", function(nv, ov) {
          $log.debug("watch showTime:", nv);
          if (nv && nv !== "") {
            try {
              var time = parseInt(nv);
              element.html(MyUtilService.formatDate(time, format));
            } catch (e) {
              $log.debug("directive show-time error:", e);
            }
          }
        });

        $scope.$on("$destroy", function() {
          $log.debug("directive show-time destroy...");
          watch();
        });
      }
    };

  }]);


})();