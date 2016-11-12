var router = require('koa-router')();

router.get('/', function (ctx, next) {
  this.body = 'this a users response!';
});

module.exports = router;
