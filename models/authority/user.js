"use strict";
const cwd = process.cwd();
const sequelize = require(cwd + '/bin/service').init().mysql;
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },//用户ID
        account: {
            type: DataTypes.STRING(22),
            allowNull: false,
            unique: true
        },//账户名
        password: {
            type: DataTypes.STRING(40),
            allowNull: false
        },//密码
        name: {
            type: DataTypes.STRING(10),
            defaultValue: ""
        },//姓名
        nickname: {
            type: DataTypes.STRING(15),
            defaultValue: "匿名"
        },//昵称
        qq: {
            type: DataTypes.INTEGER(12).UNSIGNED
        },//qq
        picture: {
            type: DataTypes.STRING(2048),
            defaultValue: "http://web-mobile-top.bj.bcebos.com/default/picture.jpg"
        },//头像
        phone: {
            type: DataTypes.INTEGER(11).UNSIGNED
        },//手机号
        email: {
            type: DataTypes.STRING(32)
        },//邮箱
        city: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            references: {
                model: sequelize.import(cwd + '/models/utils/city.js'),
                key: 'id'
            }
        },//城市邮编
        brithday: {
            type: DataTypes.DATE
        },//生日
        introduction: {
            type: DataTypes.STRING(255), defaultValue: ""
        },//简介
        wx_id: {
            type: DataTypes.STRING(32), defaultValue: ""
        },//openid
        qq_id: {
            type: DataTypes.STRING(32), defaultValue: ""
        }//qqid
    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['phone','wx_id','qq_id']
                },
            ],
            classMethods: {
                associate: function (models) {
                    models.User.belongsToMany(models.Role, { through: models.User_Role, foreignKey: 'user', otherKey: 'role' })
                }
            },
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'user',
            underscored: true,
            timestamps: true, //ms
            paranoid: true//删除状态
        }
    );
};
