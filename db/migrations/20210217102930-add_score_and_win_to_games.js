'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Games', 'distance', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },{ transaction: t }),
        queryInterface.addColumn('Games', 'win', {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Games', 'distance', { transaction: t }),
        queryInterface.removeColumn('Games', 'win', { transaction: t })
      ]);
    });
  }
};
