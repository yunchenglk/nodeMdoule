/**
 * Created by lk on 2017/10/11.
 */
var PATH = require('path');
/**
 * 获取文件后缀名
 * @param path
 * @returns {*}
 */
exports.getExtName = function (path) {
    return PATH.extname(path);
}
/**
 * 判断是否为空
 * @param obj
 * @returns {boolean}
 */
exports.isEmpty = function (obj) {
    if (!obj && obj !== 0 && obj !== '') {
        return true;
    }
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
}

/**
 * 判断是否再arr中存在
 * @param arr
 * @param obj
 * @returns {boolean}
 */
exports.contains = function (arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
