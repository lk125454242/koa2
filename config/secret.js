/**
 * Created by Administrator on 2016/8/10.
 */
/* 获取 加密配置文件 开始*/
const cry = require('crypto');
const secret = require('./config').secret;
/* 获取 加密配置文件 结束*/

module.exports = {
    cipher:(str) => {
        const cipher = cry.createCipher('aes192', secret);
        var encrypted = cipher.update(str, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },
    decipher:(str) => {
        const decipher = cry.createDecipher('aes192', secret);
        var deciphered = decipher.update(str,'hex','utf8');
        deciphered += decipher.final('utf8');
        return deciphered;
    }
};