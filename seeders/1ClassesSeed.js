'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Classes', [{
      name : 'Wizard',
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name : 'Warrrior',
      createdAt : new Date(),
      updatedAt : new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classes', [{
      name : 'Warrior'
    }])
  }
};
