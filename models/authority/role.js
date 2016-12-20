"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Role", {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },//角色ID
        name: {
            type: DataTypes.STRING(22),
            allowNull: false
        },//姓名
        authority: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }//权限类别
    }, {
            classMethods: {
                associate: function (models) {
                    models.Role.belongsToMany(models.User, { through: models.User_Role, foreignKey: 'role', otherKey: 'user' });
                    models.Role.belongsToMany(models.Route, { through: models.Role_Route, foreignKey: 'role', otherKey: 'route' })
                }
            },
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'role',
            underscored: true,
            timestamps: true, //ms
            paranoid: true//删除状态
        }
    );
};
