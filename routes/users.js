var router = require('koa-router')();
var users_mongoose = require('../vilidate/users_mongoose');
/* 注册账户 */
router.post('/register', async (ctx, next) => {
    var user,username,password1,password2,data,param = ctx.request.body;
    username = param.username;
    password1 = param.password[0];
    password2 = param.password[1];
    await users_mongoose.find_user(username).then(function (data) {
        user = data;
    }).catch(function (err) {
        users_mongoose.error(ctx);
    });
    console.log(user);
    if(user){
        ctx.body = {
            code: 401,
            msg: '已经被注册，请修改账户名'
        }
    }else {
        if(password1 === password2){
            data = await users_mongoose.save_user(username,password1);
            ctx.body = {
                code: 200,
                data: data,
                msg: '注册成功'
            }
        }else {
            ctx.body = {
                code: 401,
                msg: '两次密码输入不一致'
            }
        }
    }
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
