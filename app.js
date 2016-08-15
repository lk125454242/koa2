const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const session = require('koa-session');

const index = require('./routes/index');
const users = require('./routes/users');

//加载数据库
require('./config/server');

// middlewares
app.use(convert(bodyparser));
app.use(convert(session(app)));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'hbs',
  map: { hbs: 'handlebars' }
}));
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  try {
    await next();
    /*
    * TODO 防止  reject 调用全局error 导致500
    * TODO 以后肯定不应该这么处理
    * TODO 导致 服务器对于接口错误的混淆
    * */
  }catch (e){
    console.log(e);
  }
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err);
  logger.error('server error', err, ctx);
});


module.exports = app;