/**
 * Created by Administrator on 2016/11/22 0022.
 */
const router = require('koa-router')();
const cwd = process.cwd();
const validate = require(cwd + '/middleware/validate/tool');
const response = require(cwd + '/middleware/response');
const wx_public = require(cwd + '/middleware/wx_public');


router.get(
  '/',
  function (ctx, next) {
    return Promise.resolve('123').then(function(user) {
      ctx.user = user;
      return next();
    });
  },
  function (ctx) {
    console.log(ctx.user);
    // => { id: 17, name: "Alex" }
  }
);

// router.get('/',function(){

// }, async function (ctx, next) {

//     this.body = await wx_public.ticket();
// },function(ctx, next){
//     throw new Error('301 登录失效');
// });
module.exports = router;
