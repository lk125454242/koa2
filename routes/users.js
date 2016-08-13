var router = require('koa-router')();
var users_mongoose = require('../vilidate/users_mongoose');
/* 注册账户 */
router.post('/register', async (ctx, next) => {
    var user,username,password1,password2,data,param = ctx.request.body,result;
    username = param.username;
    password1 = param.password[0];
    password2 = param.password[1];
    await users_mongoose.find_user(username).then(function (data) {
        console.log(1);
        if(data){
            throw new Error('已经被注册，请修改账户名');
        }
    }).then(function () {
        console.log(2);
        if(password1 !== password2){
            throw new Error('两次密码不一致');
        }
    }).then( async function () {
        console.log(3);
        ctx.body = await users_mongoose.save_user(username,password1).then(function (data) {
            return {
                code: 200,
                data: data,
                msg: '注册成功'
            };
        });
    }).catch(function (err) {
        console.log(4);
        ctx.body = {
            code: 401,
            msg: err
        };
    }).done(function (err) {
        console.log(err);
    });
});
router.get('/get_users', async (ctx, next) => {
    var data;
    data = users_mongoose.get_users();
    ctx.body = {
        code: 200,
        data: data,
        msg: '成功'
    }
});

module.exports = router;
