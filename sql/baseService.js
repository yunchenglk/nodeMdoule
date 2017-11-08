var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var _sqlhelp = require('./_utils/_sqlHelp.js');
var entypes = require('./entity/entityTypes');
var config = {
    userName: "Admin",
    password: "Hao123.com",
    server: "121.32.236.56",
    options: {
        database: "test"
    }
}
var sqlService = function () {
    this.connection = new Connection(config);
}
/**
 * 查询
 * @param str 要执行的sql语句
 * @param callback(err,rows) 回调函数
 */
sqlService.prototype.query = function (str, callback) {          //执行查询    
    var connection = this.connection;
    var rows = {};
    connection.on('connect', function (err) {                 //连接数据库，执行匿名函数    
        if (err) {
            callback({ 'err': err['message'] + '请检查账号、密码是否正确,且数据库存在' });
        } else {
            var request = new Request(str, function (err, rowCount) {
                if (err)
                    err = { 'err': err['message'] };
                callback(err, rows);
                connection.close();
            });
            var n = 0;
            request.on('row', function (columns) {
                rows[n] = {};
                columns.forEach(function (column) {
                    rows[n][column.metadata.colName] = column.value;        //获取数据              
                });
                n++;
            });
            connection.execSql(request);            //执行sql语句 
        }
    });
}
/**
 * @param name 表名称
 * @param entity 要插入的实体
 * @param callback(err,rowCount) rowCount受响应行数
 */
sqlService.prototype.insert = function (name, entity, callback) {
    var connection = this.connection;
    connection.on('connect', function (err) {
        if (err) {
            callback({ 'err': err['message'] + '请检查账号、密码是否正确,且数据库存在' });
        } else {
            var sql = _sqlhelp.makeSql(name, entity, function (err, sql) {
                if (err) {
                    console.log(err);
                } else {
                    var request = new Request(sql, function (err, rowCount, rows) {
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            console.log(rowCount + ' row(s) inserted');
                            callback(null, rowCount);
                        }
                    });
                    _sqlhelp.getTables(function (err, data) {
                        var model = data[name];
                        for (var col in model) {
                            request.addParameter(col, entypes.getValue(model[col]), entity[col]);
                        }
                    }); 
                    connection.execSql(request);
                }

            })

        }
    })
}
module.exports = new sqlService();