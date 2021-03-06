'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Region.hasMany(models.Game, {foreignKey: "region_name", sourceKey: 'name'})
    }
  };
  Region.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    cities: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};