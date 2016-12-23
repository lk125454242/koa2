"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Media", {
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
        picture: {
            type: DataTypes.STRING(2048),
            defaultValue: '',
            comment: '图片'
        },
        describe: {
            type: DataTypes.STRING(255),
            defaultValue: '',
            comment: '描述'
        }
    }, {
            classMethods: {
                associate: function (models) {
                    models.Media.belongsToMany(models.Classify, { through: models.ClassifyMedia, foreignKey: 'media', otherKey: 'classify' });
                }
            },
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'media',
            underscored: true,
            timestamps: true, //ms
            paranoid: true//删除状态
        }
    );
};
