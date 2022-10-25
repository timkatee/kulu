const DataTypes = require("sequelize").DataTypes;
const _Organizations = require("./Organizations");
const _UserRoles = require("./UserRoles");
const _SequelizeMeta = require("./SequelizeMeta");
const _Users = require("./Users");

function initModels(sequelize) {
  const Organizations = _Organizations(sequelize, DataTypes);
  const UserRoles = _UserRoles(sequelize, DataTypes);
  const SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  const Users = _Users(sequelize, DataTypes);


  return {
    Organizations,
    UserRoles,
    SequelizeMeta,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
