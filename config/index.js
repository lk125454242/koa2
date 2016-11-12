let  _ =  require('lodash');
let result = {
    tentcent: {
        COS: {//对象存储 CDN
            AppId: '1252014258',
            SecretId: 'AKIDkAqRt9hrwJYeq5z8wYyFMH0fEbLygr2Q',
            SecretKey: 'QfhhZXMKCViw40jFanpgPw9FBzeJqBJG',
            Bucket: 'static',
            Host: 'https//bj.api.qcloud.com/'
        }
    }
}
console.log(_.trim(process.env.NODE_ENV));
switch (_.trim(process.env.NODE_ENV)) {
    case 'development':
        result.server = require('./server.dev.js');
        break;
    case 'production':
        result.server = require('./server.pro.js');
        break;
}
module.exports = result; 