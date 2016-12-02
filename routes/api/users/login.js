/**
 * Created by Administrator on 2016/11/30 0013.
 */
const router = require('koa-router')();
const _ = require('lodash');
const moment = require('moment');

const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');
const mysql = require(cwd + '/bin/service').init().mysql;
const response = require(cwd + '/middleware/response');
const users_middleware = require(cwd + '/middleware/validate/users');
const crypto = require(cwd + '/middleware/crypto');

router.post('/',
    async function (ctx, next) {
        let that = this,
            body = this.request.body,
            username = body.username,
            password = body.password,
            error_message = '';

        /* 验证开始 */
        if (error_message = await users_middleware.account(username)) {//验证用户名
            return response.error(this, {
                message: error_message
            })
        }
        if (error_message = await users_middleware.password(password)) {//验证密码
            return response.error(this, {
                message: error_message
            })
        }
        /* 验证结束 */
        let result = await mysql.queryAsync({
            sql: 'SELECT * FROM users WHERE account = ? AND password = ?',
            timeout: 4000, // 4s
            values: [
                username,
                password
            ]
        })
        let info = result[0];
        if (result && info) {
            info = _.pick(info, ['id', 'nickname', 'picture', 'brithday']);
            info.brithday = moment(info.brithday).format('YYYY-MM-DD');
            //登录成功或写入session
            let session = this.session;
            let now = Date.now().toString();
            session.login = crypto.cipher('aes-128-cbc', now);
            session.now = now;
            return response.success(that, info)
        } else {
            return response.error(this, {
                message: '用户名或密码错误'
            })
        }
    });
module.exports = router;
