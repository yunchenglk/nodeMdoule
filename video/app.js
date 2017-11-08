var express = require('express');
var fs = require('fs');
var cookieParser = require('cookie-parser');




var app = express();
app.use(cookieParser())
app.use(function(req,res,next){
    if (req.url == '/favicon.ico') {
        return;
    }
    next();
})

app.get("/",function(req,res){
    fs.readFile("./1.html",function(err,data){
       // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.write(data);
        res.send();
    })
})
app.get("/sp",function(req,res){
    console.log(req.url);
    fs.readFile("./1.mp4",function(err,data){
        for(var key in  req.cookies){
            console.log("cookie名:"+key);
            console.log(",cookie值:"+req.cookies[key]+"<br />");
        }
        res.write(data);
        res.send();
    })

})
app.listen(3000);

// var fs = require('fs');
// var url = require("url");
// var server = require('http').createServer(function (req, res) {
//     if (req.url != "/favicon.ico") {
//         var pathname = url.parse(req.url).pathname;
//         if (pathname == "/") {
//             console.log("aaaa");
//             res.writeHead(200, { 'Content-Type': 'video/mp4' });
//             var rs = fs.createReadStream('./1.mp4');
//             rs.on('end', function () {
//                 res.end();
//                 console.log('end call');
//             });

//         } else if (pathname == "/sp") {
//             var datas = fs.readFileSync("./1.html", "utf-8")
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.write(datas);
//             res.end(" ");

//         }
//     }
// }).listen(8080);

// server.on('error', function (err) {
//     console.log('err');
// });