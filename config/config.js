/**
 * Created by Administrator on 2016/7/19 0019.
 */

const mongo = {
    username:'',
    password:'',
    hostname:'localhost',
    port:'27017',
    databasename:'users'
};
const secret = 'buzhidao yongshenme mima hao';
const mongodb = (function (mongo) {
    if(mongo.username){
        return (
            'mongodb://' +
            mongo.username + ':' +
            mongo.password + '@' +
            mongo.hostname + ':' +
            mongo.port + '/' +
            mongo.databasename
        )
    }else {
        return (
            'mongodb://' +
            mongo.hostname + ':' +
            mongo.port + '/' +
            mongo.databasename
        )
    }
})(mongo);



exports.secret = secret;
exports.mongo = mongodb;
exports.redis = '6379';