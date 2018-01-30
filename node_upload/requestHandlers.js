'use strict'
var exec = require("child_process").exec,
    execFile = require("child_process").execFile,
    querystring = require("querystring"),
    fs = require("fs"),
    path = require('path'),
    root = path.resolve('.'),
    formidable = require("formidable");

function start(response, request) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data"  method="post">'+
    '<input type="file" name="upload">'+
    '<input type="text" name="aa">'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    // execFile('node', [path.join(root, '/test.js')], (error, stdout, stderr) => {
    execFile('zsh', [path.join(root, '/test.sh')], (error, stdout, stderr) => {
        if (error){
            console.log('error');
            return;
        }
        console.log(`test.js out ${stdout}；；；；${process}`);
        console.dir(process);
    });

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();

    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, path.join(root, '/img/test.png'));
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response, request){
    console.log("Request handler 'show' was called.");
    fs.readFile(path.join(root, '/img/test.png'), "binary", function(error, file) {
        if(error){
            response.writeHead(500, {"Content-Type": "text/png"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

module.exports = {
    start: start,
    upload: upload,
    show: show
}