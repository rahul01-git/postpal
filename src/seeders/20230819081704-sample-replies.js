'use strict';

/** @type {import('sequelize-cli').Seeders} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Replies', [
      {
        id: 1,
        user_id: 1,
        comment_id: 1,
        description: 'Reply by Ram to the first comment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 2,
        comment_id: 2,
        description: 'Reply by Sita to the second comment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Replies', null, {});
  },
};
