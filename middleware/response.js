/**
 * Created by Administrator on 2016/11/14 0014.
 */
var _ = require('lodash');
exports.success = function (ctx, data) {
    let response = {
        code: data.code || 200,
        message: '成功'
    };
    if (_.isArray(data)) {
        response.data = {
            list: data
        }
    } else {
        response.data = data;
    }
    ctx.body = response;
};
exports.sqlError = function (ctx, err) {
    console.log(err);
    ctx.body = response = {
        code: 500,
        message: err.message,
        state: err.parent.sqlState
    };
};
exports.error = function (ctx, err) {
    let response = {
        code: err.code || 500,
        message: err.message || 'sql数据存储失败'
    }
    ctx.body = response;
}