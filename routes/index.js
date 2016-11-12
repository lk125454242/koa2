var router = require('koa-router')();
var cwd = process.cwd();
require(cwd + '/middlerware/tencent')

router.get('/', async function (ctx, next) {
  await this.render('index', {
    title: 'koa2 title'
  });
})
module.exports = router;
