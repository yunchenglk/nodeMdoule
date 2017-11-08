var types = require('tedious').TYPES;
var hashTable = require('../_utils/HashTable');

var hash = new hashTable();
hash.add("String", types.NVarChar);
hash.add("Number", types.Int);
hash.add("Date", types.DateTime);
hash.add("ObjectId", types.UniqueIdentifier);

module.exports = hash;