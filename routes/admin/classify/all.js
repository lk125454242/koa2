const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const _ = require('lodash');

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');
const format = require(cwd + '/middleware/format');
    
router.get('/', async function (ctx, next) {
    let body = ctx.request.query,
        where,
        keyword = body.keyword;
    if (keyword) {
        where = {
            name: {
                $like: '%' + keyword + '%'
            }
        }
    }
    await models.Classify.findAll({
        where: where,
        raw: true
    }).then((result) => {
        response.success(ctx, result);
    }, (err) => {
        response.sqlError(ctx, err);
    })
})
module.exports = router;
