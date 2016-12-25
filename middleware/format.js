const _ = require('lodash');
/**
 * @function appendChild 格式化父子级数据
 * @param {object[]} result 源数据
 * @param {string} source_prop 源父子关系参照属性名称1
 * @param {string} parent_prop 目标父子关系参照属性名称2
 * @param {string} filter 删除数据的依据属性名称 deletedAt
 * @param {string} filter_value 删除数据的依据属性值 deletedAt
 * */
exports.appendChild = function (result, source_prop, parent_prop, filter, filter_value) {
    result.forEach(function (item, i) {
        var parent_id = item[parent_prop];
        result.every(function (v) {
            if (v[source_prop] == parent_id) {
                if (v.children) {
                    v.children.push(item);
                } else {
                    v.children = [item];
                }
                return false;
            }
            return true;
        })
    });
    return _.filter(result, function (item) {
        return item[filter] === filter_value;
    });
};