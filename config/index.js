let _ = require('lodash');
let service = require(process.cwd() + '/bin/service').init;
let result = {
    tentcent: {
        COS: {//对象存储 CDN
            AppId: '1252014258',
            SecretId: 'AKIDkAqRt9hrwJYeq5z8wYyFMH0fEbLygr2Q',
            SecretKey: 'QfhhZXMKCViw40jFanpgPw9FBzeJqBJG',
            Bucket: 'static',
            Host: 'https://sh.file.myqcloud.com/files/v2/'
        }
    }
}
switch (_.trim(process.env.NODE_ENV)) {
    case 'production':
        service(require('./server.pro.js'));
        break;
    default:
        process.env.NODE_ENV = 'development';
        service(require('./server.dev.js'));
}
module.exports = result; 