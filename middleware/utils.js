/**
 * Created by Administrator on 2016/11/22 0022.
 */
/**
 * @function
 * @name random_string
 * @param {Number} length - 返回字符串长度
 * @returns {String} random string - 返回随机字符串
 */
exports.random_string = function (length) {
    var base_str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        base_str_length = 62;
    var result = '';
    while(length--){
        result += base_str[(Math.random() * (base_str_length - 1))|0]
    }
    return result;
};