const router = require('koa-router')();
router.get('/', function (ctx, next) {
  this.redirect('/angular/index.html');
});

module.exports = router;