/**
 * Created by Administrator on 2016/8/12.
 */
var module = require('../database/mongodb/all_module');
var User = module.User;

exports.error = function (ctx) {
    ctx.body = {
        code: 500,
        msg:'服务器错误'
    }
};

exports.find_user = function (username) {
    return new Promise( (resolve,reject) => {
        User.find({username: username}, function (err, users) {
            if (err) {
                reject('find_user',err);
            } else {
                resolve(users);
            }
        });
    })
};
exports.save_user = function (username, password) {
    var newUser = new User({
        username: username,
        password: password
    });
    newUser.save(function (err, newUser) {
        if (err) {
            console.log('save_user',err);
            return false;
        } else {
            return newUser;
        }
    })
};
exports.get_users = function () {
    User.find({},function (err, users) {
        if(err){
            console.log('get_users',err);
            return false;
        }else {
            return users;
        }
    });
};