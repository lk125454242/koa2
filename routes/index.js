var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };
  await ctx.render('index', {});
});
router.get('/time', async function (ctx, next) {
  var res = ctx.response;
  res.set('Content-Type','text/event-stream');
  res.write("data: {\"now\":"+Date.now()+"}\r\n\r\n");
  res.end();
});
module.exports = router;
