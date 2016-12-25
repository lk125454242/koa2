const router = require('koa-router')();
const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');
const response = require(cwd + '/middleware/response');
const wx_public = require(cwd + '/middleware/wx_public');
const tencent = require(cwd + '/middleware/tencent')

router.get('/', function (ctx, next) {
    let url = ctx.request.query.url;
    if (url) {
        return response.success(ctx, { sign: tencent.COS_O('font', url) })
    } else {
        //有效期两个小时
        return response.success(ctx, { sign: tencent.COS_M('font', Date.now() / 1000 + 3600 * 2) });
    }
    
});
module.exports = router;