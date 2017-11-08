var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var router = require('./controller');
var login = require('./controller/login.js');
var formidable = require('formidable');
var hash = require('./_utils/HashTable.js');
var fs = require('fs');
var app = express();



app.use(express.static('./public'));
app.use(cookieParser())
app.set("view engine", "ejs")

app.use(function (req, res, next) {
    if (req.url == '/favicon.ico') {
        return;
    }
    //判断是否登陆
    login.isLogin(req, function (result) {
        if (req.method.toLocaleUpperCase() == "POST")
            next();
        else if (!result)
            res.render('login',{"msg":""});

    });

});

app.get('/', router.showIndex);
app.get('/:controller', router.showController);
app.get('/:controller/:action', router.showControllerInfo);
app.get('/:controller/:action/:id', router.showControllerInfo);

app.post('*', function (req, res) {
    var hashData = new hash();
    var form = new formidable.IncomingForm({
        keepExtensions: true,//保留后缀
        uploadDir: __dirname + "/upload",
        multiples: true
    });

    form.on('field', function (name, value) {
        hashData.add(name, value);
    });
    form.on('fileBegin', function (name, file) {
        console.log('==============fileBegin=================');
        console.log(name);
        console.log(file);
    });
    form.on('end', function () {
        eval("login.login(hashData,res)");
    });
    form.parse(req);
});

app.listen(3000);