let cwd = process.cwd(),
    request = require('request'),
    crypto = require(cwd + '/middleware/crypto'),
    HAMC_SHA1 = crypto.HAMC_SHA1,
    to_BASE64 = crypto.to_BASE64,
    COS = require(cwd + '/config/').tentcent.COS;

var Crypto = require('crypto');

let get_sign = (() => {
    let bast_str = 'a=' + COS.AppId + '&b=' + COS.Bucket + '&k=' + COS.SecretID + '&e=';
    return (fileid, isOnce) => {
        let now = Math.floor(Date.now() / 1000),    
            random = Math.random().toString().slice(-10),
            file = encodeURIComponent(fileid);
        console.log(now);
        if (isOnce) {
            let source = bast_str + '0&t=' + now + '&r=' + random + '&f=' + file,
                sign = HAMC_SHA1(source, COS.SecretKey);
            return to_BASE64(sign += source)
        } else {
            let source = bast_str + '7776000&t=' + now + '&r=' + random + '&f=',
                sign = HAMC_SHA1(source, COS.SecretKey);
            var data = new Buffer(source,'utf8');
    // 
            var res = Crypto.createHmac('sha1',COS.SecretKey).update(data).digest();
            
            var bin = Buffer.concat([res,data]);
            
            return bin.toString('base64');
    // 
            //return to_BASE64(sign += source)
        }
    }
})()
let sign = get_sign('12345');

// request({
//     method: 'post',
//     url: COS.Host + COS.AppId + '/' + COS.Bucket,
//     headers: {
//         "Authorization": sign,
//         "Content-Type": "application/json",
//         "Content-Length": 15
//     },
//     body: {
//         op: 'list',
//         num: 20,
//     },
//     data: {
//         op: 'list',
//         num: 20,
//     },
//     form: {
//         op: 'list',
//         num: 20,
//     },
//     multipart: [
//         {
//             'content-type': 'application/json',
//             body: JSON.stringify({ op: 'list' })
//         }
//     ],
//     postData: {
//         mimeType: 'application/x-www-form-urlencoded',
//         params: [
//             {
//                 name: 'op',
//                 value: 'list'
//             },
//             {
//                 name: 'num',
//                 value: 20
//             }
//         ]
//     }
// }, function (err, response, body) {
//     console.log(body);
// })

request({
    method: 'GET',
    url: COS.Host + COS.AppId + '/' + COS.Bucket,
    headers: {
        "Authorization": sign,
        "Content-Type": "application/json",
        "Content-Length": 15
    },
    body: {
        op: 'list',
        num: 20,
    },
    data: {
        op: 'list',
        num: 20,
    },
    form: {
        op: 'list',
        num: 20,
    },
    multipart: [
        {
            'content-type': 'application/json',
            body: JSON.stringify({ op: 'list' })
        }
    ],
    qs: {
        op: 'list',
        num: 20,
    },
    postData: {
        mimeType: 'application/x-www-form-urlencoded',
        params: [
            {
                name: 'op',
                value: 'list'
            },
            {
                name: 'num',
                value: 20
            }
        ]
    }
}, function (err, response, body) {
    console.log(body);
})