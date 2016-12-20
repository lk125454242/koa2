const fs = require('fs');
/**
 * Created by Administrator on 2016/11/22 0022.
 */
/**
 * @function
 * @name random_string
 * @param {Number} length - 返回字符串长度
 * @returns {String} random string - 返回随机字符串
 */
const random_string = function (length) {
    var base_str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        base_str_length = 62;
    var result = '';
    while(length--){
        result += base_str[(Math.random() * (base_str_length - 1))|0]
    }
    return result;
};
exports.random_string = random_string;
/** 
 * @function file_path 查询当前文件夹下所有文件
 * @param [string] path 文件夹的绝对路径
 * @returns [array] absolute_array 所有文件的路径数组
*/
const file_path = (path) => {
    try{
        let absolute_array = [],
            paths = fs.readdirSync(path);
        paths.forEach((v) => {
            let files = fs.lstatSync(path + '/' + v);
            if(files.isDirectory()){
                let result = file_path(path + '/' + v);
                absolute_array = absolute_array.concat(result);
            }else {
                absolute_array.push((path + '/' + v));
            }
        });
        return absolute_array;
    }catch(e){
        console.log('error',e);
    }
}
exports.file_path = file_path;