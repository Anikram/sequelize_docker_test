const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('Person', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
  })
};
