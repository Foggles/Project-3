'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Abilities', [{
      name: 'Fireball',
      type: 'Spell',
      effect: '2d3!',
      createdAt: new Date(),
      updatedAt: new Date(),
      ClassId: 2
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Abilities', [{
      name: 'Sword'
    }])
  }
};
