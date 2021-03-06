const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const _ = require('lodash');

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');


router.post('/', async function (ctx, next) {
    let body = ctx.request.body,
        roles = body.roles || [],
        remove = body.remove || [];
    if (!roles && !remove) {
        response.error(ctx, { message: '参数错误' });
    }
    await models.User_Role.destroy({
        where: {
            $or: remove
        },
        force: true//物理删除
    })
    await models.User_Role.bulkCreate(roles, {
        validate: true
    }).then((result) => {
        response.success(ctx, result);
    }, (err) => {
        response.sqlError(ctx, err);
    })
})
module.exports = router;
