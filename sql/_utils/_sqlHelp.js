var util = require('util');
var _util = require('./_utils.js');
var fs = require('fs');
var path = require('path');
/**
 * 
 * 生成添加的sql语句
 * 返回sql，columns
 * @param tableName 表名称
 * @param obj 对象
 */
exports.makeSql = function (tableName, obj, callback) {
    if (tableName.length == 0) {
        callback({ "err": "tableName不能为空" });
    } else if (typeof (obj) === undefined) {
        callback({ "err": "obj不能为空" });
    } else {
        var sql = "INSERT INTO DBO.%s (";
        var vsql = "VALUES ( ";
        var columns = [];
        for (var pro in obj) {
            sql += pro + ",";
            vsql += "@" + pro + ",";
            columns.push(pro);
        }
        sql = _util.DelLastComma(sql, 1);
        vsql = _util.DelLastComma(vsql, 1);
        sql += ") ";
        vsql += ");"
        sql += vsql;
        callback(null, util.format(sql, tableName));
    }
}
/**
 * 获取实体JSON
 */
exports.getTables = function (callback) {
    var filename = path.join(path.dirname(__dirname), 'config/table.json');
    tabConf = JSON.parse(fs.readFileSync(path.normalize(filename)));
    callback(null, tabConf);
}