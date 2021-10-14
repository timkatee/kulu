const { Op } = require("sequelize");
//
let unquoteJsonObjectProperties = (jsonObject) => {
    try {
        return eval('(' + JSON.stringify(jsonObject).replace(/"([^"]+)":/g, '$1:') + ')')
    } catch (e) {
        return jsonObject
    }
}

module.exports = {unquoteJsonObjectProperties}