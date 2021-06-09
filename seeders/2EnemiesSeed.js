'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Enemies', [{
      name: 'Ghoul',
      type: 'Undead',
      health: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Enemies', [{
      name: 'Ghoul'
    }])
  }
};
