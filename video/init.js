var db = require('./util/_db');
var objectid = require('objectid');
var dateutil = require('date-utils').language("es");
var fs = require('fs');

var cookie = {
    "key": "====",
    "date": new Date(),
    "odate": new Date().add({ "days": 1 }),
    "uuid": objectid()
}
fs.readFile('./1.mp4', function (err, data) {
    cookie.code = data;
    db.save("cookie", cookie, function (err, res) {
        if (err) {
            logger.err(err);
        }
        console.log(res._id)
    });
})




// fs.createReadStream('./1.mp4',)
// db.save("cookie", cookie, function (err, res) {
//     if (err) {
//         logger.err(err);

//     }
//     console.log(res._id)
// });