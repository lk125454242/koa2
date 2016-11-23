/**
 * Created by Administrator on 2016/11/13 0013.
 */
const router = require('koa-router')();
const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');
const mysql = require(cwd + '/bin/service').init().mysql;
const response = require(cwd + '/middleware/response');
router.post('/', async function (ctx, next) {
    var that = this;
    var body = this.request.body;
    var data = {
        account: body.username,
        password: body.password,
        phone: body.phone
    };
    await new Promise((resolve, reject)=> {
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
});
module.exports = router;
