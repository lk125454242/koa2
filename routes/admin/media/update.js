const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');

router.post('/', async function (ctx, next) {
    let body = ctx.request.body,
        id = body.id,
        name = body.name,
        picture = body.picture,
        describe = body.describe;
    if (!id) {
        return response.error(ctx, {
            message: '参数错误'
        })
    }
    await models.Media.update({
        name: name,
        describe: describe,
        picture: picture,
    }, {
        where: {
            id: id
        },
        raw: true
    }).then((result) => {
        return response.success(ctx, result);
    }, (err) => {
        return response.sqlError(ctx, err);
    })
})
module.exports = router;
