"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Classify", {
        id: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            comment: 'id'
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '名称'
        },
        parent: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            comment: '父级'
        },
        level: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            defaultValue: 0,
            comment: '层级'
        }
    }, {
            classMethods: {
                associate: function (models) {
                    models.Classify.belongsToMany(models.Media, { through: models.ClassifyMedia, foreignKey: 'classify', otherKey: 'media' });
                }
            },
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'classify',
            underscored: true,
            timestamps: true, //ms
            paranoid: true//删除状态
        }
    );
};
