"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("UtilsCity", {
        id: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            primaryKey: true,
            unique: true
        },//角色ID
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },//名称
        parent: {
            type: DataTypes.INTEGER(6).UNSIGNED
        }//父级
    }, {
            classMethods: {
            },
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'zzz_utils_city',
            underscored: true,
            timestamps: false, //ms
            paranoid: false//删除状态
        }
    );
};
