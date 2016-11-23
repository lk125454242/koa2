const router = require('koa-router')();

router.get('/', async function (ctx, next) {
  const context = {
    version: process.version,
    time: new Date(),
    title: '首页'
  };
  await this.render('index', context);
});

module.exports = router;