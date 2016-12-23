"use strict";
const cwd = process.cwd();
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("User_Role", {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        user: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: false,
            unique: false,
            comment: '用户Id'
        },
        role: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: false,
            unique: false,
            comment: '角色Id'
        }
    }, {
            indexes: [
                {
                    unique: false,
                    fields: ['user', 'role']
                },
            ],
            classMethods: {},
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'zzz_relation_user_role',
            underscored: true,
            timestamps: false, //ms
            paranoid: false//删除状态
        }
    );
};
