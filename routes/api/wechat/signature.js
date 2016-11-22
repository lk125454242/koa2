/**
 * Created by Administrator on 2016/11/22 0022.
 */
const router = require('koa-router')();
const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');
const response = require(cwd + '/middleware/response');
const wx_public = require(process.cwd() + '/middleware/wx_public');


router.get('/', async function (ctx, next) {
    console.log(this.request.query);
    var url = this.request.query.url;
    if (!url) {
        this.body = {
            message: '参数错误'
        }
    }
    this.body = await wx_public.signature(url);
});
module.exports = router;



