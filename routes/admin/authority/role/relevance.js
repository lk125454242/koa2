const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const _ = require('lodash');

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');


router.post('/', async function (ctx, next) {
    let body = ctx.request.body,
        routes = body.routes || [],
        remove = body.remove || [];
    if (!routes && !remove) {
        response.error(ctx, { message: '参数错误' });
    }
    await models.Role_Route.destroy({
        where: {
            $or: remove
        },
        force: true//物理删除
    })
    await models.Role_Route.bulkCreate(routes).then((result) => {
        response.success(ctx, result);
    }, (err) => {
        response.sqlError(ctx, err);
    })
})
module.exports = router;
