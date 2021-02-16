'use strict';

const cities = `[{
  "capitalCity": "Zurich",
  "lat": 47.373878,
  "long": 8.545094
},
  {
    "capitalCity": "Paris",
    "lat": 48.864716,
    "long": 2.349014
  },
  {
    "capitalCity": "Madrid",
    "lat": 40.416775,
    "long": -3.703790
  },
  {
    "capitalCity": "London",
    "lat": 51.509865,
    "long": -0.118092
  },
  {
    "capitalCity": "Berlin",
    "lat": 52.520008,
    "long": 13.404954
  },
  {
    "capitalCity": "Amsterdam",
    "lat": 52.377956,
    "long": 4.897070
  },
  {
    "capitalCity": "Rome",
    "lat": 41.902782,
    "long": 12.496366
  },
  {
    "capitalCity": "Oslo",
    "lat": 59.924545,
    "long": 10.768063
  },
  {
    "capitalCity": "Vienna",
    "lat": 48.210033,
    "long": 16.363449
  }
]`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Regions', [{
      name: 'europe',
      cities: cities,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Regions', null, {});
  }
};
