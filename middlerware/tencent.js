let cwd = process.cwd(),
    request = require('request'),
    crypto = require(cwd + '/middlerware/crypto'),
    HAMC_SHA1 = crypto.HAMC_SHA1,
    to_BASE64 = crypto.to_BASE64,
    COS = require(cwd + '/config/').tentcent.COS;

// https//bj.api.qcloud.com/files/v2/1252014258/static/foldertest
//'https://' + COS.Host + '/files/v2/' + COS.AppId + '/' + COS.Bucket +  '/foldertest/'

var Crypto = require('crypto');
var Cry = require('crypto-js');

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
            //let source = bast_str + '7776000&t=' + now + '&r=' + random + '&f=';
            let source = 'a=200001&b=newbucket&k=AKIDUfLUEUigQiXqm7CVSspKJnuaiIKtxqAv&e=1437995704&t=1437995644&r=2081660421&f=',    
                sign = HAMC_SHA1(source, 'bLcPnl88WU30VY57ipRhSePfPdOfSruK');
            
            console.log(
                to_BASE64(
                    Crypto.createHmac('SHA1', 'bLcPnl88WU30VY57ipRhSePfPdOfSruK').update(source).digest('hex') + source
                )
            )

             console.log(
                to_BASE64(
                    Cry.HmacSHA1(source, 'bLcPnl88WU30VY57ipRhSePfPdOfSruK') + source
                )
            )

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
console.log(sign);

console.log('正确：CkZ0/gWkHy3f76ER7k6yXgzq7w1hPTIwMDAwMSZiPW5ld2J1Y2tldCZrPUFLSURVZkxVRVVpZ1FpWHFtN0NWU3NwS0pudWFpSUt0eHFBdiZlPTAmdD0xNDcwNzM2OTQwJnI9NDkwMjU4OTQzJmY9LzIwMDAwMS9uZXdidWNrZXQvdGVuY2VudF90ZXN0LmpwZw==');