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
      Region.hasMany(models.Game, {as: 'games'})
    }
  };
  Region.init({
    name: DataTypes.STRING,
    cities: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Region',
  });
  return Region;
};