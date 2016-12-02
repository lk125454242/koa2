/**
 * Created by Administrator on 2016/11/13 0013.
 */
const router = require('koa-router')();
const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');
const mysql = require(cwd + '/bin/service').init().mysql;
const response = require(cwd + '/middleware/response');
const users_middleware = require(cwd + '/middleware/validate/users');
router.post('/',
    async function (ctx, next) {
        let that = this,
            body = this.request.body,
            username = body.username,
            password = body.password,
            email = body.email,
            error_message = '';

        let data = {
            account: body.username,
            password: body.password,
            email: body.email
        };


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
        if (error_message = await users_middleware.email(email)) {//验证邮箱 
            return response.error(this, {
                message: error_message
            })
        }
        /* 验证结束 */

        await new Promise((resolve, reject) => {
            mysql.query({
                sql: 'INSERT INTO users SET ?',
                timeout: 4000, // 4s
            },
                data, function (error, results, fields) {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(results, fields);
                    }
                });
        }).then(function () {
            return response.success(that, {})
        }, function (err) {
            return response.sqlError(that, err);
        })
        console.log(4);
    });
module.exports = router;
