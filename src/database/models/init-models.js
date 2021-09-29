var DataTypes = require("sequelize").DataTypes;
var _Organizations = require("./Organizations");
var _Users = require("./Users");
var _SequelizeMeta = require("./SequelizeMeta");

function initModels(sequelize) {
  var Organizations = _Organizations(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);


  return {
    Organizations,
    Users,
    SequelizeMeta,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
