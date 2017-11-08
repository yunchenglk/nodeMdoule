var db = require('./baseService');
var sql = "select * from entity"
db.query(sql, function (err, rows) {
    if (err)
        console.log(err);
    else {
        console.log(rows);
    }
})


// var entity = {
//     count: 11,
//     name: "测试数据",
//     time: new Date()
// }
// entity.uuid = "1E63A922-D639-49FA-889D-1F4417223987";
// db.insert("entity", entity, function (err, rowCount) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(rowCount);
//     }
// })

