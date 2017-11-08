exports.showIndex = function (req, res) {
    res.render("index");
}
exports.showLogin = function (req, res) {
    res.render('login');
}

exports.showController = function (req, res) {
    res.render(req.params.controller);
}
exports.showsmsinfo = function (req, res) {
    res.render('smsInfo');
}
exports.showControllerInfo = function (req, res) {
    res.render(req.params.controller + "/" + req.params.action);
}
exports.allPost = function (req, res) {
    res.send('提交页面')
}