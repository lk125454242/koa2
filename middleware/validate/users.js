const cwd = process.cwd();
const response = require(cwd + '/middleware/response');

exports.account = function (username) {
    let boolean = username && /^[A-z][A-z0-9]{7,21}$/.test(username);
    if (!boolean) {
        return '账户名必须为字母开头并且长度在8-22位之间,只能包含字母、数字';
    }
}
exports.password = function (password) { 
    let boolean = password && /^[a-zA-Z]\w{5,17}$/.test(password)
    if (!boolean) {
        return '密码必须以字母开头，长度在6~18之间，只能包含字符、数字和下划线';
    }
}
exports.email = function (email) { 
    let boolean = email && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    if (!boolean) {
        return '邮箱格式不正确';
    }
}
exports.phone = function (phone) { 
    let boolean = phone && /^1[3578]\d{9}$/.test(phone); 
    if (!boolean) {
        return '手机号码不正确';
    }
}