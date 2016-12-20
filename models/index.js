"use strict";
const cwd = process.cwd();
const fs = require("fs");
const path = require("path");
const sequelize = require(cwd + '/bin/service').init().mysql;
const utils = require(cwd + '/middleware/utils')

let db = {
    sequelize: sequelize
};

utils.file_path(__dirname).filter((file) => {
    return file.indexOf('.js') != -1 && (file.indexOf('index.js')) === -1;
}).forEach(function (file) {
    let model = sequelize.import(file);
    db[model.name] = model;
})

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
module.exports = db;
