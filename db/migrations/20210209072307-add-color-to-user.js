'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'color', {
          type: Sequelize.DataTypes.STRING
        }, {transaction: t}),
        queryInterface.addColumn('Users', 'pet', {
          type: Sequelize.DataTypes.STRING
        }, {transaction: t})
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'color', {transaction: t}),
        queryInterface.removeColumn('Users', 'pet', {transaction: t}),
      ])
    })
  }
};
