const mongoose = require('mongoose');
const ioredis = require('ioredis');
const mysql = require('mysql');
const Sequelize = require("sequelize");
const my = require('sequelize');
const exec = require('child_process').exec;
const Promise = require('bluebird');
const redisStore = require('koa-redis');

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
    return new Sequelize(config.string);
}

const redis_database = (config) => {
    let redis_connection = new ioredis(config);
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
const redis_store = (config) => {
    let redis_connection = redisStore(config);
    redis_connection.client.on("error", function (err) {
        console.log("redisStore 连接失败" + err);
    });
}

module.exports = {
    init: (() => {
        let connect = {
            mongo: null,
            mysql: null,
            redis: null,
            store: null
        }
        return (config) => {
            if (connect.mongo || connect.mysql || connect.redis) {
                return connect;
            } else {
                connect.mongo = mongo_database(config.mongo);
                connect.mysql = Promise.promisifyAll(mysql_database(config.mysql));
                connect.redis = redis_database(config.redis);
                connect.store = redis_store(config.redis)
                return connect;
            }
        }
    })()
}