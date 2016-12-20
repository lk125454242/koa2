const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');


router.post('/', async function (ctx, next) {
    let body = ctx.request.body,
        name = body.name,
        type = body.type;
    if (!name || !type) {
        return response.error(res, { message: '参数错误' });
    }
    await models.Role.create({
        name: name,
        authority: type//权限类别
    },{
        raw: true
    }).then((result) => {
        response.success(ctx, {});
    }, (err) => {
        response.sqlError(ctx, err);
    })

})
module.exports = router;
