const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Users.init(sequelize, DataTypes);
}

class Users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    full_names: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "USER_UNIQUE"
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_role_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    publish: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "USER_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "full_names" },
        ]
      },
    ]
  });
  }
}
