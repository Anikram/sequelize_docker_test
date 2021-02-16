'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Games', 'PlayerId', {
          type: Sequelize.DataTypes.UUID,
          allowNull: false
        },{ transaction: t }),
        queryInterface.addColumn('Games', 'RegionId', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Games', 'PlayerId', { transaction: t }),
        queryInterface.removeColumn('Games', 'RegionId', { transaction: t })
      ]);
    });
  }
};
