let cwd = process.cwd(),
    request = require('request'),
    crypto = require(cwd + '/middlerware/crypto'),
    HAMC_SHA1 = crypto.HAMC_SHA1,
    to_BASE64 = crypto.to_BASE64,
    COS = require(cwd + '/config/').tentcent.COS;

// https//bj.api.qcloud.com/files/v2/1252014258/static/foldertest
//'https://' + COS.Host + '/files/v2/' + COS.AppId + '/' + COS.Bucket +  '/foldertest/'

var Crypto = require('crypto');

let get_sign = (() => {
    let bast_str = 'a=' + COS.AppId + '&b=' + COS.Bucket + '&k=' + COS.SecretID + '&e=';
    return (fileid, isOnce) => {
        let now = Date.now(),
            random = Math.random().toString().slice(-10),
            file = encodeURIComponent(fileid);
        if (isOnce) {
            let source = strbast_str + '0&t=' + now + '&r=' + random + '&f=' + file,
                sign = HAMC_SHA1(source, COS.SecretKey);
            return to_BASE64(sign += source)
        } else {
            let source = bast_str + '7776000&t=' + now + '&r=' + random + '&f=',
                sign = HAMC_SHA1(source, COS.SecretKey);
            return to_BASE64(sign += source)
        }
    }
})()
let sign = get_sign('12345');

// request({
//     method: 'post',
//     url: 'https://region.file.myqcloud.com/files/v2/1252014258/static/',
//     headers: {
//         Authorization: sign
//     },
//     postData: {
//         mimeType: 'application/x-www-form-urlencoded',
//         params: [
//           {
//             name: 'foo',
//             value: 'bar'
//           },
//           {
//             name: 'hello',
//             value: 'world'
//           }
//         ]
//       }
// }, function () {
//     console.log(arguments);
// })