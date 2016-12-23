const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');


router.post('/', async function (ctx, next) {
    let body = ctx.request.body,
        name = body.name,
        picture = body.picture,
        describe = body.describe;
    if (!name || !picture || !describe) {
        return response.error(res, { message: '参数错误' });
    }
    await models.Media.create({
        name: name,
        describe: describe,
        picture: picture,
    },{
        raw: true
    }).then((result) => {
        response.success(ctx, {});
    }, (err) => {
        response.sqlError(ctx, err);
    })

})
module.exports = router;