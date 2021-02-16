'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Players', [{
      username: "alexo",
      email: "aaa@aaa.aaa",
      hash: '123',
      salt: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null,{});
  }
};
