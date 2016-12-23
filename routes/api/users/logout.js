/**
 * Created by Administrator on 2016/11/30 0013.
 */
const router = require('koa-router')();

const cwd = process.cwd();
const response = require(cwd + '/middleware/response');

router.post('/',function (ctx, next) {
    ctx.session.login = '';
    ctx.session.now = '';
    return response.success(ctx, {message: '登出成功'});
});
module.exports = router;
