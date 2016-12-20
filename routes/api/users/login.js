/**
 * Created by Administrator on 2016/11/30 0013.
 */
const router = require('koa-router')();
const _ = require('lodash');
const moment = require('moment');

const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');
const users_middleware = require(cwd + '/middleware/validate/users');
const crypto = require(cwd + '/middleware/crypto');

router.post('/',
    async function (ctx, next) {
        let body = ctx.request.body,
            username = body.username,
            password = body.password,
            error_message = '';

        /* 验证开始 */
        if (error_message = await users_middleware.account(username)) {//验证用户名
            return response.error(ctx, {
                message: error_message
            })
        }
        if (error_message = await users_middleware.password(password)) {//验证密码
            return response.error(ctx, {
                message: error_message
            })
        }
        /* 验证结束 */
        let result = await models.User.findOne({
            where: {
                account: username,
                password: password
            },
            raw: true
        })
        if (result) {
            result = _.pick(result, ['id', 'nickname', 'picture', 'brithday']);
            result.brithday = moment(result.brithday).format('YYYY-MM-DD');
            //登录成功或写入session
            let session = ctx.session;
            let now = Date.now().toString();
            session.login = crypto.cipher('aes-128-cbc', now);
            session.now = now;
            return response.success(ctx, result)
        } else {
            return response.error(ctx, {
                message: '用户名或密码错误'
            })
        }
    });
module.exports = router;
