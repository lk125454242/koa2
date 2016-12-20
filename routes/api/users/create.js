/**
 * Created by Administrator on 2016/11/13 0013.
 */
const router = require('koa-router')();

const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');
const users_middleware = require(cwd + '/middleware/validate/users');
router.post('/',
    async function (ctx, next) {
        let body = ctx.request.body,
            username = body.username,
            password = body.password,
            email = body.email,
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
        if (error_message = await users_middleware.email(email)) {//验证邮箱 
            return response.error(ctx, {
                message: error_message
            })
        }
        /* 验证结束 */

        await models.User.findOrCreate({
            where: {
                account: username
            },
            defaults: {
                account: username,
                password: password,
                email: email
            },
            raw: true
        }).then((result)=>{
            if(result[1]){
                return response.success(ctx, {message: '注册成功'});
            }else{
                return response.error(ctx, {message: '此账户已经存在'});
            }
            }, (err) => {
            return response.sqlError(ctx, err);
        })
    });
module.exports = router;
