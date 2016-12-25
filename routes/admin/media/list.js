const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const _ = require('lodash');

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');
const files_path = require(cwd + '/middleware/files_path').file;

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
    await models.Media.findAll({
        where: where,
        raw: true,
        order: 'created_at DESC'
    }).then((result) => {
        response.success(ctx, {
            base: files_path,
            list: result
        });
    }, (err) => {
        response.sqlError(ctx, err);
    })
})
module.exports = router;
