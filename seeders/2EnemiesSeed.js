'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Enemies', [{
      name : 'Ghoul',
      type : 'Undead',
      createdAt : new Date(),
      updatedAt : new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Enemies', [{
      name : 'Ghoul'
    }])
  }
};
