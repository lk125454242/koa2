"use strict";
const cwd = process.cwd();
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("User_Role", {
        user: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: '用户Id'
        },
        role: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: '角色Id'
        }
    }, {
            classMethods: {},
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'zzz_relation_user_role',
            underscored: true
        }
    );
};
