var dateutil = require('date-utils').language("es");
//var db = require("../_utils/_dbCookie.js");
var db = require("../_utils/_db.js");
var cookieParser = require('cookie-parser');
var logger = require('pomelo-logger').getLogger('controller');
var objectid = require('objectid');

var login = function () {

}

login.prototype.test = function () {
    console.log("test");
}
login.prototype.isLogin = function (req, callback) {
    callback(false);
}
login.prototype.login = function (data, res) {
    var LoginName = data.getValue("username");
    var LoginPwd = data.getValue("password");
    var parent = this;
    db.findOne("USER", { "LoginName": LoginName }, function (err, result) {
        if (err)
            res.render('login', { "msg": "系统错误，请联系管理员" });
        else if (result == null || result.LoginPwd != LoginPwd) {
            res.render('login', { "msg": "账号密码错误，请联系" });
        } else {
            parent.getLogin(function (key) {
                console.log(key);
                res.redirect("/");
            })
        }
    })


}
login.prototype.checkCookie = function (key, callback) {
    callback(false);
}
/**
 * 登陆，生成Cookie，并且保存过期时间和唯一的key
 */
login.prototype.getLogin = function (callback) {
    var cookie = {
        "key": "====",
        "date": new Date(),
        "odate": new Date().add({ "days": 1 }),
        "uuid": objectid()
    }
    db.save("cookie", cookie, function (err, res) {
        if (err) {
            logger.err(err);
            callback(null);
        }
        logger.info(res);
        callback(res._id)
    });
}
module.exports = new login();