//################## 依赖库
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const hbs = require('koa-hbs');
//const views = require('koa-views');
//const compose = require('koa-compose');//加载多个中间件
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const koa_static = require('koa-static');
const mount = require('mount-koa-routes');
//################## 启动数据库 依赖文件
const config = require('./config');
//################## 其他变量
//var cwd = process.cwd();
//################## middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(koa_static(__dirname + '/public'));
app.use(convert(hbs.middleware({
    viewPath: __dirname + '/views',
    defaultLayout: 'layout',
    layoutsPath: __dirname + '/views'
})));
app.use(async (ctx, next) => {
  const render = ctx.render;
  ctx.render = async function _convertedRender () {
    return co.call(ctx, render.apply(ctx, arguments))
  }
  await next();
});
require('./middleware/tencent');
//##################  error handler && logger time
app.use(async (ctx, next) => {//
    const start = new Date();
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            code: 500,
            message: err.message
        };
    }
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//##################  路由
mount(app, process.cwd() + '/routes');
app.use(router.routes(), router.allowedMethods());

//##################  错误处理
app.on('error', function(err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx);
});


module.exports = app;