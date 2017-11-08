/**
 * 删除指定长度的位数
 * @param str 需要处理的字符串
 * @param len 需要删除的长度
 */
exports.DelLastComma = function (str, len) {
    return str.substr(0, str.length - len);
} 

