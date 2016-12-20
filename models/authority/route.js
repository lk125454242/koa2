"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Route", {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },//角色ID
        name: {
            type: DataTypes.STRING(22),
            allowNull: false,
            unique: true
        },//姓名
        path: {
            type: DataTypes.STRING(225),
            allowNull: false,
            unique: true
        },//权限类别
        authority: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    }, {
            classMethods: {
                associate: function (models) {
                    models.Route.belongsToMany(models.Role, { through: models.Role_Route, foreignKey: 'route', otherKey: 'role' })
                }
            },
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'route',
            timestamps: true, //ms
            paranoid: true//删除状态
        }
    );
};
