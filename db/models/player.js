'use strict';
const crypto = require('crypto')
const bcrypt   = require('bcrypt-nodejs');
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    };
    static hashPassword(password) {
      const salt = crypto.randomBytes(32).toString('hex');
      const hash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');

      return {
        salt: salt,
        hash: hash
      }
    };
    static validPassword(password, hash, salt) {
      const hashVerify = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
      // console.log(hash + " <=> " + hashVerify)

      return hash === hashVerify
    }
  };
  Player.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    top_score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};