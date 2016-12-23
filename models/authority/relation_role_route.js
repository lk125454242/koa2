"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Role_Route", {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        role: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: false,
            unique: false,
            comment: '角色Id'
        },
        route: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: false,
            unique: false,
            comment: '路由Id'
        }
    }, {
            indexes: [
                {
                    unique: false,
                    fields: ['role', 'route']
                },
            ],
            classMethods: {},
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'zzz_relation_role_route',
            underscored: true,
            timestamps: false, //ms
            paranoid: false//删除状态
        }
    );
};
