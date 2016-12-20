const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const _ = require('lodash');

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');


router.get('/', async function (ctx, next) {
    let query = ctx.request.query,
        id = query.id;
    if (!id){ 
        return response.error(ctx, { message: '参数错误'});
    }
    await models.User.findOne({
        attributes: ['id','account','nickname','picture','qq','email','city','brithday','created_at'],
        where: { id: id },
        include: [models.Role]
    }).then((result) => {
        response.success(ctx, result || {});
        }, (err) => {
            console.log(err);
        response.sqlError(ctx, err);
    })
})
module.exports = router;
