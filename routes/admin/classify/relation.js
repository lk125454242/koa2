const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const _ = require('lodash');

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');
const format = require(cwd + '/middleware/format');

router.post('/', async function (ctx, next) {
    let body = ctx.request.body;
    let relation = body.relation || [];
    let not = body.not || [];
    let id = body.id;
    if ( !id || (!not.length && !relation.length) ){ 
        return response.error(ctx, { message: '参数错误' });
    }
    await Promise.all([
        models.ClassifyMedia.destroy({
            where: { 
                classify: id,
                media: {
                    $in: not
                }
            }
        }),
        models.ClassifyMedia.bulkCreate(relation),
    ]).then((result) => {
        response.success(ctx, result);
    }, (err) => {
        response.sqlError(ctx, err);
    })
})
module.exports = router;
