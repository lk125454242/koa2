let crypto = require('crypto');

exports.HAMC_SHA1 = (str, key) => crypto.createHmac('sha1', key).update(str).digest('hex');
exports.to_BASE64 = (str) => new Buffer(str).toString('base64');
exports.parse_BASE64 = (str) => new Buffer(str, 'base64').toString('ascii');
exports.MD5 = (str) => crypto.createHash('md5').update(str).digest('hex');