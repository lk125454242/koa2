const router = require('koa-router')();
router.get('/', function (ctx, next) {
  ctx.redirect('/index.html/#/login');
});

module.exports = router;