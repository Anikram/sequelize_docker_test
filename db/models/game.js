'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.Region, {
        foreignKey: "region_name",
        // as: "region_id",
        allowNull: false,
        // as: "region",
      })
      Game.belongsTo(models.Player, {
        foreignKey: "player_id",
        allowNull: false,
        // as: "player",
      })
    }
  };
  Game.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    player_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Players',
        key: 'id'
      }
    },
    region_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Regions',
        key: 'name'
      }
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};