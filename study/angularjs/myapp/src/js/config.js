(function() {
  //第一个myapp的模块，引用controllers模块
  var app = angular.module("myapp", ["ngRoute", "ngCookies", "ngSanitize", "ngAnimate", "controllers"]);
  // 初始化controllers模块
  angular.module("controllers", []);
  //配置日志是否开启debug
  app.config(["$logProvider", function($logProvider) {
    $logProvider.debugEnabled(true);
  }]);

  // 处理ajax请求
  app.config(["$httpProvider", function($httpProvider) {
    /* post提交可以使用json数据 */
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    var parseParams = function(params) { // 参数处理
      var query = "",
        name, value, fullSubName, subName, subValue, innerObj, i;
      for (name in params) {
        value = params[name];
        if (value instanceof Array) {
          for (i = 0; i < value.length; i++) {
            subValue = value[i];
            fullSubName = name + "[" + i + "]";
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += parseParams(innerObj) + "&";
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + "." + subName;
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += parseParams(innerObj) + "&";
          }
        } else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
        }
      }
      var querydata = query.length ? query.substr(0, query.length - 1) : query;
      return querydata;
    };

    $httpProvider.defaults.transformRequest = [function(data) {
      var formdata = angular.isObject(data) && String(data) !== "[object File]" ? parseParams(data) : data;
      return formdata;
    }];

  }]);

  // 配置路由
  app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("", {
      templateUrl: "/templates/welcome.html"
    }).when("/", {
      templateUrl: "/templates/welcome.html"
    }).when("/rone", {
      templateUrl: "/templates/rone.html"
    }).when("/rtwo", {
      templateUrl: "/templates/rtwo.html"
    }).otherwise({
      templateUrl: "templates/welcome.html"
    });
  }]);

})();