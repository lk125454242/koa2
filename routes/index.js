var router = require('koa-router')();
var cwd = process.cwd();

router.get('/', async function (ctx, next) {
  await this.render('index', {
    title: 'koa2 title'
  });
})
module.exports = router;
