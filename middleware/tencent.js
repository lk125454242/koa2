let cwd = process.cwd(),
    crypto = require('crypto'),
    COS = require('qcloud_cos'),//对象存储
    Image = require('tencentyun'),//万象优图
    Video = require('qcloud_video'),//微视频
    config = require(cwd + '/config/').tentcent;
/* COS 签名 */
let COS_sign = function (bucket, fileid, expired) {
    let now = parseInt(Date.now() / 1000);
    let rdm = parseInt(Math.random() * Math.pow(2, 32));
    let secretId = config.COS.SecretId, secretKey = config.COS.SecretKey;
    if (!secretId || !secretKey) {
        return -1;
    }
    let plainText = 'a=' + config.AppId + '&k=' + secretId + '&e=' + expired + '&t=' + now + '&r=' + rdm + '&f=' + fileid + '&b=' + bucket;
    let data = new Buffer(plainText, 'utf8');
    let res = crypto.createHmac('sha1', secretKey).update(data).digest();
    let bin = Buffer.concat([res, data]);
    let sign = bin.toString('base64');
    return sign;
}

//初始化COS模块
COS.conf.setAppInfo(config.AppId, config.COS.SecretId, config.COS.SecretKey);
Image.conf.setAppInfo(config.AppId, config.CIG.SecretId, config.CIG.SecretKey);
Video.conf.setAppInfo(config.VDO.AppId, config.VDO.SecretId, config.VDO.SecretKey);
//文档 https://www.qcloud.com/doc/product/227/3386
module.exports = {
    COS,
    Image,
    Video,
    COS_O: function (bucket, fileid) {
        return COS_sign(bucket, '/' + config.AppId + '/' + bucket + '/' + fileid, 0);
    },
    COS_M: function (bucket, expired) {
        return COS_sign(bucket, '', expired);
    }
};