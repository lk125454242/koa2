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
const mongoose = require('mongoose');
const ioredis = require('ioredis');
const mysql = require('mysql');
const exec = require('child_process').exec;

var mount = require('mount-koa-routes');

const config = require('./config');
const mongo_config = config.server.mongo;
const redis_config = config.server.redis;
const mysql_config = config.server.mysql;
const mongo_database = () => {
  mongoose.connect(
    mongo_config.connection_string
  )
  let db = mongoose.connection;
  db.once('open', console.log.bind(null, 'mongoD已连接...'));
  db.on('error', function (err) {
    exec('/usr/bin/mongod --dbpath /data/mongo/db --logpath /data/mongo/log/mongodb.log --logappend &', function (err) {
      if (err) {
        console.log('mongo...连接失败');
      } else {
        mongo_database();
      }
    })
  });
}

const mysql_database = () => {
  let mysql_connection = mysql.createConnection(mysql_config);
  mysql_connection.connect((err) => {
    if (err) {
      console.error('mysql 连接错误: ' + err.stack);
      return;
    }
    console.log('mysql 连接id: ' + mysql_connection.threadId);
  });
}
const redis_database = () => {
  let redis_connection = new ioredis(redis_config.connection_string);
  redis_connection.set('foo', 'bar');
  redis_connection.get('foo').then((result) => {
    if (result === 'bar') {
      console.log('redis 已连接...');
    } else {
      console.log('redis', redis_connection.get('foo'))
    }
  })
}
mongo_database();
mysql_database();
redis_database();

// middlewares
app.use(convert(bodyparser));
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
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

mount(app, process.cwd() + '/routes');

// const index = require('./routes/index');
// const users = require('./routes/users');
// router.use('/', index.routes(), index.allowedMethods());
// router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;