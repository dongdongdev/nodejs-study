//引用http模块
var http = require('http');

//创建服务器
var server = new http.Server();

//处理请求
server.on('request', function(req, resp) {
    console.log(req.url);
    //设置应答头信息
    resp.writeHead(200, {
        'Content-Type': 'text/html'
    });
    //输出内容
    resp.write('<h1>请求的url' + req.url + '</h1>');
    //结束应答
    resp.end();
});

//启动监听
server.listen(8080);