var router = require('koa-router')();
var users_mongoose = require('../vilidate/users_mongoose');
/* 注册账户 */
router.post('/register', async (ctx, next) => {
    var username,password1,password2,data,param = ctx.request.body;
    username = param.username;
    password1 = param.password[0];
    password2 = param.password[1];
    var a = await users_mongoose.find_user(username).then(function (data) {
        if(data.length){
            return Promise.reject('已经被注册，请修改账户名');
        }
    }).then(function () {
        if(password1 !== password2){
            return Promise.reject('两次密码不一致');
        }
    }).then( async function () {
        ctx.body = await users_mongoose.save_user(username,password1).then(function (data) {
            return {
                code: 200,
                data: data,
                msg: '注册成功'
            };
        });
    }).catch(function (errMessage) {
        ctx.body = {
            code: 200,
            msg: errMessage
        };
    });
    console.log(a);
    console.log('return');
});
router.get('/get_users', async (ctx, next) => {
    await users_mongoose.get_users().then(function (data) {
        ctx.body = {
            code: 200,
            data: data,
            msg: '成功'
        }
    });
});

module.exports = router;
