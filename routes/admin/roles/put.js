const router = require('koa-router')();
const compose = require('koa-compose');//加载多个中间件
const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');

router.get('/', async function (ctx, next) {
  await this.render('index', {
    title: 'koa2 title'
  });
})
module.exports = router;
