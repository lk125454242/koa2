/**
 * Created by Administrator on 2016/11/21 0021.
 */

const cwd = process.cwd();
const request = require('request');
const rp = require('request-promise');
const crypto = require('crypto');
const redis = require(cwd + '/bin/service').init().redis;
const utils = require(cwd + '/middleware/utils');
const wx_config = require(cwd + '/config').wx_public;

let weChat = {
    token: async function () {
        try {
            let result = await redis.get('access_token');
            if (result) {
                return {
                    code: 200,
                    data: result
                }
            }
            let body = await rp({
                url: 'https://api.weixin.qq.com/cgi-bin/token',
                qs: {
                    grant_type: 'client_credential',
                    appid: wx_config.AppID,
                    secret: wx_config.AppSecret
                },
                json: true,
            });
            if (body && body.access_token) {
                redis.set('access_token', body.access_token, 'EX', body.expires_in - 100);
                return {
                    code: 200,
                    data: body.access_token
                }
            } else {
                return {
                    message: body.errmsg,
                    code: body.errcode
                };
            }
        }
        catch (e) {
            return {
                code: 500,
                message: e
            }
        }
    },
    ticket: async function () {
        try {
            let result = await redis.get('ticket');
            if (result) {
                return {
                    code: 200,
                    data: result
                }
            }
            let token = await this.token();
            let body = await rp({
                url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
                qs: {
                    access_token: token.data,
                    type: 'jsapi'
                },
                json: true,
            });
            if (body && body.ticket) {
                redis.set('ticket', body.ticket, 'EX', body.expires_in - 100);
                return {
                    code: 200,
                    data: body.ticket
                }
            } else {
                return {
                    message: body.errmsg,
                    code: body.errcode
                }
            }
        } catch (e) {
            return {
                message: e
            }
        }
    },
    signature: async function (url) {
        try {
            // let result = await redis.get('signature');
            // if (result) {
            //     return {
            //         code: 200,
            //         data: JSON.parse(result)
            //     }
            // }
            let jsapi_ticket = await this.ticket();
            if (!jsapi_ticket) {
                return {
                    message: 'ticket 不存在'
                }
            }
            let noncestr = utils.random_string(16);
            let timestamp = ((Date.now() / 1000) | 0).toString();
            let signature_source = 'jsapi_ticket=' + jsapi_ticket +
                '&noncestr=' + noncestr +
                '&timestamp=' + timestamp +
                '&url=' + url;
            let signature = crypto.createHash('sha1').update(signature_source, 'utf8').digest('hex');
            let result = {
                appId: wx_config.AppID,
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: signature,
                url: url
            };
            //redis.set('signature', JSON.stringify(result), 'EX', 5);
            return {
                code: 200,
                data: result
            }
        } catch (e) {
            console.log(e);
            return {
                message: e
            }
        }
    }
};
module.exports = weChat;
