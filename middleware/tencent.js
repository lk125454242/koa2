let cwd = process.cwd(),
    COS = require('qcloud_cos'),//对象存储
    Image = require('tencentyun'),//万象优图
    Video = require('qcloud_video'),//微视频
    config = require(cwd + '/config/').tentcent;
//初始化COS模块
COS.conf.setAppInfo(config.AppId, config.COS.SecretID, config.COS.SecretKey);
Image.conf.setAppInfo(config.AppId, config.CIG.SecretID, config.CIG.SecretKey);
Video.conf.setAppInfo(config.VDO.AppId, config.VDO.SecretID, config.VDO.SecretKey);
//文档 https://www.qcloud.com/doc/product/227/3386
module.exports = {
    COS,
    Image,
    Video
};