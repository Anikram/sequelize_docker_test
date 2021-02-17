'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Games', 'player_id', {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Players",
            key: "id"
          }
        },{ transaction: t }),
        queryInterface.addColumn('Games', 'region_name', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
            model: "Regions",
            key: "name"
          }
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Games', 'player_id', { transaction: t }),
        queryInterface.removeColumn('Games', 'region_name', { transaction: t })
      ]);
    });
  }
};
