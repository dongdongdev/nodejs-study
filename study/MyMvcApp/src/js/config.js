(function(win) {
  win.MyAppConfig = {
    "name": "myapp",
    "title": "我的Angular应用"
  };

  //第一个myapp的模块，引用controllers模块
  var app = angular.module(MyAppConfig.name, ["ngRoute", "ngCookies", "ngSanitize", "ngAnimate", "ngMessages", "controllers", "services", "directives"]);
  // 初始化控制器，服务，指令三大模块
  angular.module("controllers", []);
  angular.module("services", []);
  angular.module("directives", []);

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

})(window);