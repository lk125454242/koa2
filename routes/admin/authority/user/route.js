const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const _ = require('lodash');

const cwd = process.cwd();
const models = require(cwd + '/models');
const response = require(cwd + '/middleware/response');


router.get('/', async function (ctx, next) {
    let query = ctx.request.query,
        id = query.id;
    if (!id) {
        return response.error(ctx, { message: '参数错误' });
    }
    await models.User.findOne({
        attributes: ['id', 'account', 'nickname', 'picture', 'qq', 'email', 'city', 'brithday', 'created_at'],
        where: { id: id },
        include: [{
            model: models.Role,
            attributes: ['name'],
            include: [{
                model: models.Route,
                attributes: ['path']
            }]
        }]
    }).then((result) => {
        if (!result){ 
            return response.error(ctx, {message: '用户不存在'})
        }
        result = result.get({ plain: true });
        var paths = [];
        _.forEach(result.Roles, function (v) {
            _.forEach(v.Routes, function (w) {
                paths.push(w.path)
            })
        })
        delete result.Roles;
        result.paths = paths;
        return response.success(ctx, result || {});
    }, (err) => {
        console.log(err);
        return response.sqlError(ctx, err);
    })
})
module.exports = router;
