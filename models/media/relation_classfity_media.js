"use strict";
module.exports = function (sequelize, DataTypes) {
    return sequelize.define("ClassifyMedia", {
        classify: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            allowNull: false,
            comment: '分类ID'
        },
        media: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            allowNull: false,
            comment: '媒资ID'
        }
    }, {
            classMethods: {
            },
            freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
            tableName: 'zzz_relation_classify_media',
            underscored: true,
            timestamps: false, //ms
            paranoid: false//删除状态
        }
    );
};
