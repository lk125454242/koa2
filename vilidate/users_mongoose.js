/**
 * Created by Administrator on 2016/8/12.
 */
var module = require('../database/mongodb/all_module');
var User = module.User;

exports.find_user = function (username) {
    return User.find({username: username}).then(function (data) {
        return data;
    },function (err) {
        return Promise.reject('find_user:服务器错误');
    });
};
exports.save_user = function (username, password) {
    var newUser = new User({
        username: username,
        password: password
    });
    return newUser.save().then(function (data) {
        return data;
    },function (err) {
        return Promise.reject('save_user 服务器错误');
    })
};
exports.get_users = function () {
    return User.find({}).then(function (data) {
        return data;
    },function (err) {
        return Promise.reject('find_user:服务器错误');
    });
};