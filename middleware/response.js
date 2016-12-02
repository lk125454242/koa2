/**
 * Created by Administrator on 2016/11/14 0014.
 */
var _ = require('lodash');
exports.success = function (ctx, data) {
    let response = {
        code : data.code || 200,
        message : '成功'
    };
    if(_.isArray(data)){
        response.data = {
            list : data
        }
    }else{
        response.data = data;
    }
    ctx.body = response;
};
exports.sqlError = function (ctx, err) {
    let state = err.sqlState,
        response = {
        code : 500,
        message : 'sql数据存储失败'
    };
    switch (state){
        case '23000':
            response.message = '违反唯一约束';
            break;
        default:
            response.state = state;
    }
    ctx.body = response;
};
exports.error = function (ctx, err) {
    let response = {
        code: err.code || 500,
        message: err.message || 'sql数据存储失败'
    }
    ctx.body = response;
}