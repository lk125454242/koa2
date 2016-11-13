const mongoose = require('mongoose');
const ioredis = require('ioredis');
const mysql = require('mysql');
const exec = require('child_process').exec;

const mongo_database = (config) => {
    mongoose.connect(
        config.connection_string
    )
    let db = mongoose.connection;
    db.once('open', console.log.bind(null, 'mongoD已连接...'));
    db.on('error', function (err) {
        if (err) {
            console.log('mongo...连接失败');
        }
        // /usr/bin/mongod --dbpath /data/mongo/db --logpath /data/mongo/log/mongodb.log --logappend &
    });
    return db;
}

const mysql_database = (config) => {
    let mysql_connection = mysql.createConnection(config);
    mysql_connection.connect((err) => {
        if (err) {
            console.error('mysql 连接错误: ' + err.stack);
            return;
        }
        console.log('mysql 连接id: ' + mysql_connection.threadId);
    });
    return mysql_connection;
}
const redis_database = (config) => {
    let redis_connection = new ioredis(config.connection_string);
    redis_connection.set('foo', 'bar');
    redis_connection.get('foo').then((result) => {
        if (result === 'bar') {
            console.log('redis 已连接...');
        } else {
            console.log('redis', redis_connection.get('foo'))
        }
    })
    return redis_connection;
}

module.exports = {
    init: (() => {
        let connect = {
            mongo: null,
            mysql: null,
            redis: null
        }
        return (config) => {
            if (connect.mongo || connect.mysql || connect.redis) {
                return connect;
            } else {
                connect.mongo = mongo_database(config.mongo);
                connect.mysql = mysql_database(config.mysql);
                connect.redis = redis_database(config.redis);
                return connect;
            }
        }
    })()
}