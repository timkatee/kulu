const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return SequelizeMeta.init(sequelize, DataTypes);
}

class SequelizeMeta extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'sequelize_meta',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  return SequelizeMeta;
  }
}
