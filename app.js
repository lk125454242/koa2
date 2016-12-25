//################## 依赖库
const Koa = require('koa');
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
const cors = require('kcors')
const session = require('koa-generic-session');
//################## 其他变量
const app = new Koa();
const cwd = process.cwd();
//################## 启动数据库 依赖文件
const config = require('./config');
const authority = require(cwd + '/middleware/authority');
const crypto = require(cwd + '/middleware/crypto');
const redis = require(cwd + '/bin/service').init().redis;
const response = require(cwd + '/middleware/response');
//################## middlewares
app.keys = config.keys;
app.use(convert(cors(
    {
        //origin: 'http://localhost,http://localhost:3000', //默认*
        exposeHeaders: ['X-My-Custom-Header', 'X-Another-Custom-Header'],
        maxAge: '86400',
        credentials: 'true',
        allowMethods: ['GET', 'POST', 'OPTION'],
        allowHeaders: ['authorization', 'X-PINGOTHER', 'Content-Type', 'x-requested-with']
    }
)))
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(koa_static(__dirname + '/public'));
app.use(convert(hbs.middleware({
    viewPath: __dirname + '/views',
    defaultLayout: 'layout',
    layoutsPath: __dirname + '/views'
})));
/* ##################### 建表时启用 ##################### */
// const models = require(cwd + '/models');
// models.sequelize.sync().then(function () {
//     console.log("mysql connection success");
// });


app.use(convert(session({
    key: 'koa:session',//session key
    ttl: 86400000,//默认1天
    overwrite: true,//允许覆盖
    //defer: true,//同步
    cookie: {
        //httpOnly: true, //浏览器禁止访问
        path: '/', //此域名下全部可使用
        secure: false,//不需要使用https请求
        domain: 'localhost',//主域
        maxage: 86400000//有效时间
    },
    store: require(cwd + '/bin/service').init().store
})))

app.use(async (ctx, next) => {
    const render = ctx.render;
    ctx.render = async function _convertedRender() {
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

        /*if (/^\/admin/.test(ctx.request.url)) {
            let login = ctx.session.login;
            let now = ctx.session.now;
            console.log(login, now);
            if (login) {
                login = crypto.decipher('aes-128-cbc', login);
                console.log(login, now);
                if (login == now) {
                    console.log()
                    await next();
                } else {
                    response.error(ctx, { message: '登录失效' });
                }
            } else {
                response.error(ctx, { message: '登录失效' });
            }
        } else {
            await next();
        }*/
    } catch (err) {
        // will only respond with JSON
        let err_arr = err.message.split('=>');
        if (err_arr[1]) {
            err.statusCode = err_arr[0];
            err.message = err_arr[1];
        }
        //ctx.status = 200;
        ctx.body = {
            code: err.statusCode || err.status || 500,
            message: err.message
        };
    }
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//##################  路由
//router.use(['/api','/api/wechat','/api/wechat/ticket'], authority);
//mount(app, process.cwd() + '/routes');

require('mount-koa2-routes')(app, cwd + '/routes');

app.use(router.routes(), router.allowedMethods());

//##################  错误处理
app.on('error', function (err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx);
});


module.exports = app;