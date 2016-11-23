let crypto = require('crypto');

exports.HAMC_SHA1 = (str, key) => {
    let data = new Buffer(str, 'utf-8');
    return crypto.createHmac('sha1', key).update(data).digest();
};
exports.to_BASE64 = str => new Buffer(str).toString('base64');
exports.parse_BASE64 = str => new Buffer(str, 'base64').toString('ascii');
exports.MD5 = str => crypto.createHash('md5').update(str).digest('hex');
exports.sha1 = str => crypto.createHash('sha1').update(str, 'utf8').digest('hex');

/*
    source = new Buffer(source, 'utf8')
    let sign = Crypto.createHmac('sha1', config.SecretKey).update(source).digest();
    return Buffer.concat([sign, source]).toString('base64');
*/