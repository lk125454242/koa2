const router = require('koa-router')();
router.get('/', function (ctx, next) {
  ctx.redirect('/angular/index.html');
});

module.exports = router;