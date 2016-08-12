var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };
  await ctx.render('index', {title:'123'});
});
//获取服务器时间接口
router.get('time',function (ctx, next) {
  var res = ctx.response;
//  res.set('Content-Type','text/event-stream');
  res.set('Cache-Control', 'no-cache');
//  res.set('Connection', 'keep-alive');
  ctx.body = JSON.stringify({ data:{now: Date.now()} });
});
module.exports = router;
