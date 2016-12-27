const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const _ = require('lodash');

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');
const format = require(cwd + '/middleware/format');
    
router.get('/', async function (ctx, next) {
    let id = ctx.request.query.id;
    if (!id){ 
        return response.error(ctx, { message: '参数错误' });
    }
    await models.Classify.findById(id, {
        include: [models.Media]
    }).then((result) => {
        response.success(ctx, result);
    }, (err) => {
        response.sqlError(ctx, err);
    })
})
module.exports = router;
