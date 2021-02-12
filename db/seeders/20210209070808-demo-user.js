'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Players', [{
      username: 'Samuel Jackson',
      email: 'windu@jedicouncil.rp',
      hash: '12345',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null,{});
  }
};
