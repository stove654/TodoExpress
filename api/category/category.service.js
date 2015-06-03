'use strict';


function isCreatCategory(data) {
    var isCategory = false;
    if (data.name) {
        isCategory = true
    }
    return isCategory;
}
exports.isCreatCategory = isCreatCategory;
