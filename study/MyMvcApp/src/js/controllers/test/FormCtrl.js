(function() {
    var ctrls = angular.module("controllers");
    ctrls.controller("TestFormCtrl", ["$scope", "$log", TestFormCtrl]);

    function TestFormCtrl($scope, $log) {
        $log.debug("TestFormCtrl init...");

        // 处理scope销毁
        $scope.$on("$destroy", function() {
            $log.debug("TestFormCtrl destroy...");
        });

        $scope.formdata = {

        };

        $scope.toSubmit = function() {
            $log.debug("表单数据：", $scope.formdata);
        };

    }
})();