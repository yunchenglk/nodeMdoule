var sql = require('./baseService');
var path = require('path');
var fs = require('fs');
//var dateutil = require('date-utils').language("es");
//1E63A922-D639-49FA-889D-1F4417223987
//console.log();

var entity = new Object();
entity.name = "entityname";
entity.count = 5;
entity.time = new Date();
entity.uuid = "1E63A922-D639-49FA-889D-1F4417223987";
sql.insert("entity", entity, function () {

})
 