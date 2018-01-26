'use strict';
// 导入http模块:
var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
// const crypto = require('crypto');
var root = path.resolve(process.argv[2] || '.');

// 创建http server，并传入回调函数:
function start(route, handle){
    var server = http.createServer(function (request, response) {
        // 回调函数接收request和response对象,
        var pathname = url.parse(request.url).pathname,
            filepath = path.join(root, pathname),
            postData = '';

        // console.log('200 ' + request.url);
        // request.setEncoding("utf8");

        // request.addListener("data", function(postDataChunk) {
        //     postData += postDataChunk;
        //     console.log("Received POST data chunk '"+
        //     postDataChunk + "'.");
        // });

        // request.addListener("end", function() {
        //     route(pathname, handle, response, postData);
        // });

        route(pathname, handle, response, request);

    });
    // });
    server.listen(8086);
    // 让服务器监听8086端口:
    console.log('Server is running at http://127.0.0.1:8086/');
}


module.exports.start = start;
